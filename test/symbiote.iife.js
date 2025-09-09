/*!
 * Symbiote - A lightweight DOM attachment framework
 * @version 1.0.0
 * @license MIT
 */
var Symbiote = (function (exports) {
  'use strict';

  function documentLoaded() {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  /**
   * Selector indexing and matching utilities
   * 
   * This module handles the efficient indexing and matching of CSS selectors
   * to optimize DOM element selection and attachment.
   */

  // Lightweight selector index
  const selectorIndex = {
    id: new Map(),     // id -> Set<selectors starting with #id>
    class: new Map(),  // class -> Set<selectors starting with .class>
    tag: new Map(),    // tagName(lower) or '*' -> Set<selectors>
    other: new Set(),  // Set<selectors>
  };

  /**
   * Check if a selector is stable (not a pseudo-selector)
   * Pseudo-selectors are dynamic and unreliable for DOM attachment
   */
  function isStableSelector(selector) {
    // Exclude all pseudo-selectors as they are dynamic and unreliable for DOM attachment
    return !/:[a-zA-Z-]/.test(selector);
  }

  /**
   * Index a selector for efficient lookup
   */
  function indexSelector(selector) {
    const s = selector.trim();
    // id bucket
    if (s.startsWith('#')) {
      const id = s.slice(1).split(/[^-_a-zA-Z0-9]/, 1)[0];
      if (!selectorIndex.id.has(id)) selectorIndex.id.set(id, new Set());
      selectorIndex.id.get(id).add(s);
      return;
    }
    // class bucket - handle both simple and complex selectors
    if (s.includes('.')) {
      // Extract all class names from the selector
      const classMatches = s.match(/\.[a-zA-Z0-9_-]+/g);
      if (classMatches) {
        for (const classMatch of classMatches) {
          const cls = classMatch.slice(1); // Remove the dot
          if (!selectorIndex.class.has(cls)) selectorIndex.class.set(cls, new Set());
          selectorIndex.class.get(cls).add(s);
        }
        return;
      }
    }
    // tag or * - handle attribute selectors like button[disabled]
    const first = s.split(/[\s.#[:]/, 1)[0].toLowerCase();
    if (first && (/^[a-z][a-z0-9-]*$/.test(first) || first === '*')) {
      if (!selectorIndex.tag.has(first)) selectorIndex.tag.set(first, new Set());
      selectorIndex.tag.get(first).add(s);
      return;
    }
    // attribute selectors like [data-required="true"] - index by tag if present
    if (s.startsWith('[')) {
      // Try to extract tag name from attribute selectors like button[disabled]
      const tagMatch = s.match(/^([a-z][a-z0-9-]*)\[/);
      if (tagMatch) {
        const tag = tagMatch[1];
        if (!selectorIndex.tag.has(tag)) selectorIndex.tag.set(tag, new Set());
        selectorIndex.tag.get(tag).add(s);
        return;
      }
    }
    selectorIndex.other.add(s);
  }

  /**
   * Remove a selector from the index
   */
  function deindexSelector(selector) {
    const s = selector.trim();
    let removed = false;
    if (s.startsWith('#')) {
      const id = s.slice(1).split(/[^-_a-zA-Z0-9]/, 1)[0];
      const set = selectorIndex.id.get(id);
      if (set) { set.delete(s); if (!set.size) selectorIndex.id.delete(id); removed = true; }
    } else if (s.includes('.')) {
      // Extract all class names from the selector
      const classMatches = s.match(/\.[a-zA-Z0-9_-]+/g);
      if (classMatches) {
        for (const classMatch of classMatches) {
          const cls = classMatch.slice(1); // Remove the dot
          const set = selectorIndex.class.get(cls);
          if (set) { set.delete(s); if (!set.size) selectorIndex.class.delete(cls); removed = true; }
        }
      }
    } else {
      const first = s.split(/[\s.#[:]/, 1)[0].toLowerCase();
      if (first && (/^[a-z][a-z0-9-]*$/.test(first) || first === '*')) {
        const set = selectorIndex.tag.get(first);
        if (set) { set.delete(s); if (!set.size) selectorIndex.tag.delete(first); removed = true; }
      }
    }
    // Handle attribute selectors like [data-required="true"]
    if (!removed && s.startsWith('[')) {
      const tagMatch = s.match(/^([a-z][a-z0-9-]*)\[/);
      if (tagMatch) {
        const tag = tagMatch[1];
        const set = selectorIndex.tag.get(tag);
        if (set) { set.delete(s); if (!set.size) selectorIndex.tag.delete(tag); removed = true; }
      }
    }
    if (!removed) selectorIndex.other.delete(s);
  }

  /**
   * Generator function that yields candidate selectors for an element
   * This efficiently finds likely selectors before calling el.matches()
   */
  function* candidateSelectorsFor(el) {
    // Build a small set of likely selectors before calling el.matches()
    const out = new Set();

    const id = el.id?.trim();
    if (id && selectorIndex.id.has(id)) {
      for (const s of selectorIndex.id.get(id)) out.add(s);
    }

    if (el.classList && el.classList.length) {
      for (const cls of el.classList) {
        const set = selectorIndex.class.get(cls);
        if (set) for (const s of set) out.add(s);
      }
    }

    const tag = el.tagName?.toLowerCase();
    if (tag) {
      const tset = selectorIndex.tag.get(tag);
      if (tset) for (const s of tset) out.add(s);
      const allset = selectorIndex.tag.get('*');
      if (allset) for (const s of allset) out.add(s);
    }

    // Always include complex selectors
    for (const s of selectorIndex.other) out.add(s);

    yield* out;
  }

  /**
   * Element state management utilities
   * 
   * This module handles tracking which selectors are attached to elements
   * and managing cleanup functions for proper resource management.
   */

  // Per-element attachment state (keyed by selector)
  const attachedBySelector = new WeakMap();   // Element -> Set<selectors>
  const cleanupBySelector  = new WeakMap();   // Element -> Map<selectors, fn>

  // "Direct" attachments (from template render with raw setup fns, not selector-based)
  const directCleanupMap = new WeakMap();     // Element -> Set<fn>

  /**
   * Get or create the set of attached selectors for an element
   */
  function getAttachedSet(el) {
    let set = attachedBySelector.get(el);
    if (!set) { set = new Set(); attachedBySelector.set(el, set); }
    return set;
  }

  /**
   * Get or create the cleanup map for an element
   */
  function getCleanupMap(el) {
    let map = cleanupBySelector.get(el);
    if (!map) { map = new Map(); cleanupBySelector.set(el, map); }
    return map;
  }

  /**
   * Add a direct cleanup function for an element
   */
  function addDirectCleanup(el, fn) {
    if (typeof fn !== 'function') return;
    let set = directCleanupMap.get(el);
    if (!set) { set = new Set(); directCleanupMap.set(el, set); }
    set.add(fn);
  }

  /**
   * Run all direct cleanup functions for an element
   */
  function runDirectCleanups(el) {
    const set = directCleanupMap.get(el);
    if (!set) return;
    for (const fn of set) { try { fn(); } catch (e) { console.error(e); } }
    set.clear();
    directCleanupMap.delete(el);
  }

  /**
   * Global registry management
   * 
   * This module manages the global state for setup functions and symbiote instances
   * across the entire application.
   */


  // Global registries
  const setupFunctions = new Map();     // selector -> setupFn
  const symbioteInstances = new Set();

  /**
   * Register or replace a setup function globally by selector
   */
  function defineSetup(selector, setupFunction) {
    if (!isStableSelector(selector)) {
      console.warn(`Ignoring unstable selector: ${selector}`);
      return { remove() {} };
    }

    // If setupFunction is null, remove the setup function
    if (setupFunction === null) {
      if (setupFunctions.has(selector)) {
        symbioteInstances.forEach(instance => {
          instance.cleanup(selector);
        });
        setupFunctions.delete(selector);
        deindexSelector(selector);
      }
      return { remove() {} };
    }

    // If replacing, detach existing attachments for that selector across instances
    if (setupFunctions.has(selector)) {
      symbioteInstances.forEach(instance => {
        instance.cleanup(selector);
      });
      deindexSelector(selector);
    }

    setupFunctions.set(selector, setupFunction);
    indexSelector(selector);

    // Apply to existing elements across instances
    symbioteInstances.forEach(instance => {
      instance.checkFor(selector);
    });

    return {
      remove: () => {
        symbioteInstances.forEach(instance => instance.cleanup(selector));
        setupFunctions.delete(selector);
        deindexSelector(selector);
      }
    };
  }

  /**
   * Register a symbiote instance in the global registry
   */
  function registerSymbioteInstance(instance) {
    symbioteInstances.add(instance);
  }

  /**
   * Unregister a symbiote instance from the global registry
   */
  function unregisterSymbioteInstance(instance) {
    symbioteInstances.delete(instance);
  }

  // ---------- Symbiote ----------
  class Symbiote {
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

  // Public API
  function createSymbiote(modules) {
    const symbiote = new Symbiote(modules);
    registerSymbioteInstance(symbiote);
    return symbiote;
  }

  exports.createSymbiote = createSymbiote;
  exports.default = createSymbiote;
  exports.defineSetup = defineSetup;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
