import { documentLoaded } from './utils/documentLoaded.js';

// Global nodule registry
const setupFunctions = new Map();
const symbioteInstances = new Set();
const attachedElements = new WeakSet();
const elementCleanupFunctions = new WeakMap();

class Symbiote {
  #mutationObserver = null;

  constructor(nodules = {}) {
    // Register all nodules globally first
    if (nodules && typeof nodules === 'object') {
      Object.entries(nodules).forEach(([selector, nodule]) => {
        setupFunctions.set(selector, nodule);
      });
    }    
    
    this.#mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => this.checkNode(node));
          mutation.removedNodes.forEach(node => attachedElements.delete(node));
        } else if (mutation.type === 'attributes') {
          this.checkNode(mutation.target);
        }
      });
    });
  }

  async attach(root = document.body) {
    // Wait for DOM to be ready only if using document.body
    if (root === document.body) {
      await documentLoaded();
    }
    
    this.#mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });

    // Create tree walker to traverse all elements
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT,
      null,
      false
    );

    let node;
    while (node = walker.nextNode()) {
      this.checkNode(node);
    }
  }

  checkNode(node) {
    if (!(node instanceof HTMLElement)) return;
    
    // Skip if already attached
    if (attachedElements.has(node)) return;

    // Check each class for matching modules
    const classes = Array.from(node.classList);
    classes.forEach(className => {
      if (setupFunctions.has(className)) {
        this.attachNodule(node, setupFunctions.get(className));
      }
    });
  }

  attachNodule(element, noduleFunction) {
    attachedElements.add(element);
    
    // Store cleanup function if the nodule returns one
    try {
      const cleanup = noduleFunction(element);
      if (typeof cleanup === 'function') {
        elementCleanupFunctions.set(element, cleanup);
      }
    } catch (error) {
      console.error('Error attaching module:', error);
    }
  }

  // Check for existing elements with a new nodule
  checkExistingElements(className) {
    if (this.#mutationObserver) {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach(element => {
        if (!attachedElements.has(element)) {
          this.checkNode(element);
        }
      });
    }
  }

  // Clean up elements with a specific class
  cleanupElements(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
      if (attachedElements.has(element)) {
        // Call cleanup function if it exists
        const cleanup = elementCleanupFunctions.get(element);
        if (cleanup) {
          cleanup();
          elementCleanupFunctions.delete(element);
        }
        attachedElements.delete(element);
      }
    });
  }

  // Remove this instance from the global registry
  destroy() {
    symbioteInstances.delete(this);
    if (this.#mutationObserver) {
      this.#mutationObserver.disconnect();
    }
  }
}

export function createSymbiote(modules) {
  const symbiote = new Symbiote(modules);
  symbioteInstances.add(symbiote);
  return symbiote;
}

// Global setup function registration
export function defineSetup(className, setupFunction) {
  // If there's already a setup function with this class, clean it up first
  if (setupFunctions.has(className)) {
    symbioteInstances.forEach(instance => {
      instance.cleanupElements(className);
    });
  }
  
  // Add to global registry
  setupFunctions.set(className, setupFunction);
  
  // Apply to all existing symbiote instances
  symbioteInstances.forEach(instance => {
    instance.checkExistingElements(className);
  });
  
  return {
    remove: () => {
      // Clean up all elements with this class
      symbioteInstances.forEach(instance => {
        instance.cleanupElements(className);
      });
      setupFunctions.delete(className);
    }
  };
}