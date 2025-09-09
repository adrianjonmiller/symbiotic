/**
 * Global registry management
 * 
 * This module manages the global state for setup functions and symbiote instances
 * across the entire application.
 */

import { 
  isStableSelector, 
  indexSelector, 
  deindexSelector 
} from './selectorUtils.js';

// Global registries
export const setupFunctions = new Map();     // selector -> setupFn
export const symbioteInstances = new Set();

/**
 * Register or replace a setup function globally by selector
 */
export function defineSetup(selector, setupFunction) {
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
export function registerSymbioteInstance(instance) {
  symbioteInstances.add(instance);
}

/**
 * Unregister a symbiote instance from the global registry
 */
export function unregisterSymbioteInstance(instance) {
  symbioteInstances.delete(instance);
}
