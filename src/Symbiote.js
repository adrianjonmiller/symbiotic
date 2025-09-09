import { documentLoaded } from './utils/documentLoaded.js';
import { 
  isStableSelector, 
  indexSelector, 
  candidateSelectorsFor 
} from './utils/selectorUtils.js';
import { 
  getAttachedSet, 
  getCleanupMap, 
  addDirectCleanup, 
  runDirectCleanups,
  attachedBySelector,
  cleanupBySelector
} from './utils/elementState.js';
import { 
  setupFunctions, 
  unregisterSymbioteInstance 
} from './utils/globalRegistry.js';

// ---------- Symbiote ----------
export class Symbiote {
  #mutationObserver = null;
  #changeQueue = new Set();
  #flushScheduled = false;
  #root = null;

  constructor(functions = {}) {
    // Register selectors as-is
    if (functions && typeof functions === 'object') {
      for (const [selector, setup] of Object.entries(functions)) {
        if (!isStableSelector(selector)) continue;
        setupFunctions.set(selector, setup);
        indexSelector(selector);
      }
    }

    this.#mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => this.#checkNodeOrTree(node));
          mutation.removedNodes.forEach(node => this.#detachTree(node));
        } else if (mutation.type === 'attributes') {
          const el = mutation.target;
          if (el.nodeType === 1) this.#reconcileElementSelectors(el); // HTMLElement
        }
      }
    });
  }

  async attach(root = document.body) {
    if (root === document.body) {
      await documentLoaded();
    }
    this.#root = root;

    // Watch all attributes. Selector matching can depend on any attribute.
    this.#mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true
    });

    // Initial scan
    this.#walk(root);
  }

  batch(operations) {
    if (typeof operations === 'function') return this.#addToChangeQueue(operations);
    return Promise.resolve();
  }

  update() {
    if (!this.#root) return;
    this.#walk(this.#root, /*reconcileExisting=*/true);
  }

  destroy() {
    unregisterSymbioteInstance(this);
    if (this.#mutationObserver) this.#mutationObserver.disconnect();
    if (this.#root) this.#detachTree(this.#root);
    this.#root = null;
  }

  // Clean up elements that currently match a selector
  cleanup(selector) {
    const root = this.#root || document;
    root.querySelectorAll(selector).forEach(el => this.#detachSelector(el, selector));
  }

  // Apply a newly added selector's setup to matching elements
  checkFor(selector) {
    const root = this.#root || document;
    root.querySelectorAll(selector).forEach(el => {
      const attached = getAttachedSet(el);
      if (!attached.has(selector)) {
        this.#attachSelector(el, selector, setupFunctions.get(selector));
      }
    });
  }

  // ====== Private ======

  #walk(root, reconcileExisting = false) {
    this.#mutationObserver.disconnect();

    const walker = document.createTreeWalker(root, 1, null, false); // NodeFilter.SHOW_ELEMENT = 1
    let node = root.nodeType === 1 ? root : null; // HTMLElement

    if (node) this.#checkNode(node, reconcileExisting);
    while ((node = walker.nextNode())) this.#checkNode(node, reconcileExisting);

    if (this.#root) {
      this.#mutationObserver.observe(this.#root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true
      });
    }
  }

  #checkNodeOrTree(node) {
    if (!node || typeof node.nodeType !== 'number') return;
    if (node.nodeType === 1) this.#checkNode(node, /*reconcile*/true); // HTMLElement

    if (node.hasChildNodes && node.childNodes && node.childNodes.length) {
      const walker = document.createTreeWalker(node, 1, null, false); // NodeFilter.SHOW_ELEMENT = 1
      let n;
      while ((n = walker.nextNode())) this.#checkNode(n, /*reconcile*/true);
    }
  }

  #checkNode(el, reconcileExisting) {
    if (el.nodeType !== 1) return; // HTMLElement

    if (reconcileExisting) this.#reconcileElementSelectors(el);

    for (const selector of candidateSelectorsFor(el)) {
      const setup = setupFunctions.get(selector);
      if (!setup) continue;
      const attached = getAttachedSet(el);
      if (!attached.has(selector) && isStableSelector(selector) && el.matches(selector)) {
        this.#attachSelector(el, selector, setup);
      }
    }
  }

  #reconcileElementSelectors(el) {
    const attached = getAttachedSet(el);
    if (attached.size) {
      for (const selector of Array.from(attached)) {
        // If element no longer matches this selector, detach it
        if (!el.matches(selector)) {
          this.#detachSelector(el, selector);
        }
      }
    }
    // Try to attach any missing selectors now matching
    for (const selector of candidateSelectorsFor(el)) {
      const setup = setupFunctions.get(selector);
      if (setup && !attached.has(selector) && isStableSelector(selector) && el.matches(selector)) {
        this.#attachSelector(el, selector, setup);
      }
    }
  }

  #attachSelector(el, selector, setupFunction) {
    if (!setupFunction) return;

    const attached = getAttachedSet(el);
    if (attached.has(selector)) return;

    const args =
      el.tagName === 'TEMPLATE'
        ? [this.#createRenderFunction(el), this.#createBatchFunction()]
        : [el, this.#createBatchFunction()];

    try {
      const cleanup = setupFunction(...args);
      if (typeof cleanup === 'function') {
        const cmap = getCleanupMap(el);
        cmap.set(selector, cleanup);
      }
      attached.add(selector);
    } catch (error) {
      console.error(`Error attaching selector "${selector}":`, error);
    }
  }

  #detachSelector(el, selector) {
    const attached = getAttachedSet(el);
    if (!attached.has(selector)) return;

    const cmap = getCleanupMap(el);
    const cleanup = cmap.get(selector);
    if (cleanup) {
      try { cleanup(); } catch (e) { console.error(e); }
      cmap.delete(selector);
    }
    attached.delete(selector);

    if (attached.size === 0) {
      // Clean up the WeakMap entry if no selectors are attached
      attachedBySelector.delete(el);
    }
    if (cmap.size === 0) {
      // Clean up the WeakMap entry if no cleanup functions remain
      cleanupBySelector.delete(el);
    }
  }

  #detachAllForElement(el) {
    const cmap = getCleanupMap(el);
    if (cmap) {
      for (const [selector] of cmap) this.#detachSelector(el, selector);
    }
    runDirectCleanups(el);
  }

  #detachTree(node) {
    if (!node || typeof node.nodeType !== 'number') return;
    if (node.nodeType === 1) this.#detachAllForElement(node); // HTMLElement

    if (node.hasChildNodes && node.childNodes && node.childNodes.length) {
      const walker = node.ownerDocument.createTreeWalker(node, 1, null, false); // NodeFilter.SHOW_ELEMENT = 1
      let n;
      while ((n = walker.nextNode())) this.#detachAllForElement(n);
    }
  }

  #createBatchFunction() {
    return (operations) => this.batch(operations);
  }

  #createRenderFunction(template) {
    let currentRenderedNodes = [];

    const detachRenderedTree = () => {
      for (const n of currentRenderedNodes) {
        this.#detachTree(n);
        if (n.parentNode) n.parentNode.removeChild(n);
      }
      currentRenderedNodes = [];
    };

    return (childSetupFunction) => {
      detachRenderedTree();

      const clonedContent = document.importNode(template.content, true);
      currentRenderedNodes = Array.from(clonedContent.children);
      template.after(clonedContent);

      if (typeof childSetupFunction === 'function') {
        for (const node of currentRenderedNodes) {
          if (node.nodeType !== 1) continue; // HTMLElement
          try {
            const cleanup = childSetupFunction(node, this.#createBatchFunction());
            if (typeof cleanup === 'function') addDirectCleanup(node, cleanup);
          } catch (e) {
            console.error('Error in template child setup:', e);
          }
        }
      }
    };
  }

  #addToChangeQueue(operations) {
    return new Promise((resolve, reject) => {
      this.#changeQueue.add({ operations, resolve, reject });
      this.#scheduleFlush();
    });
  }

  #scheduleFlush() {
    if (this.#flushScheduled) return;
    this.#flushScheduled = true;

    const scheduleCallback =
      typeof requestAnimationFrame !== 'undefined'
        ? requestAnimationFrame
        : (cb) => setTimeout(cb, 0);

    scheduleCallback(() => {
      this.#changeQueue.forEach(change => {
        try { change.operations(); change.resolve(); }
        catch (error) { change.reject(error); }
      });
      this.#flushScheduled = false;
      this.#changeQueue.clear();
    });
  }
}
