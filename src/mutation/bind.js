import { getBindings } from './getBindings.js';
import { createMutator } from './createMutator.js';
import { getHandler } from './getHandler.js';
import { hasRepeat } from './repeat.js';
import { repeat } from './repeat.js';

/**
 * bind(element, data)
 * 
 * Binds data to a single element only.
 * Returns an update function that can be called with new data.
 * 
 * @param {HTMLElement} element - The element to bind data to
 * @param {Object} data - The data object to bind
 * @param {Object} inject - The inject object to inject into the scope
 */
export function bind(element, data, inject = {}) {
  // Check if this is a repeat template - if so, delegate to repeat function
  if (hasRepeat(element)) {
    return repeat(element, data, inject);
  }
  
  // Traverse the tree and collect all bindings
  const createScope = (data) => ({ ...data, ...inject }); 
  const bindings = getBindings(element, createScope(data));
  const scope = createScope(data);
  
  for (const binding of bindings) {
    const initialValue = binding.dataFn(scope);
    binding.mutator = createMutator(element, binding.property, initialValue);
  }
  
  // Return update function
  return function update(newData) {
    const newScope = createScope(newData);
    for (const binding of bindings) {
      binding.mutator(binding.dataFn(newScope));
    }
  };
}

/**
 * bindAll(element, data)
 * 
 * Binds data to an element and all its descendants.
 * Returns an update function that can be called with new data.
 * 
 * @param {HTMLElement} element - The root element to bind data to
 * @param {Object} data - The data object to bind
 * @param {Object} inject - The inject object to inject into the scope
 */
export function bindAll(element, data, inject = {}) {
  const createScope = (data) => ({ ...data, ...inject }); 
  const scope = createScope(data);
  const allBindings = [];
  
  // Recursively collect bindings from all descendants
  function collectBindings(el) {
    const bindings = getBindings(el, scope);
    for (const binding of bindings) {
      binding.element = el;
      allBindings.push(binding);
    }
    
    // Traverse children
    for (const child of el.children) {
      collectBindings(child);
    }
  }
  
  collectBindings(element);
  
  for (const binding of allBindings) {
    const initialValue = binding.dataFn(scope);
    binding.mutator = createMutator(binding.element, binding.property, initialValue);
  }
  
  // Return update function
  return function update(newData) {
    const newScope = createScope(newData);
    for (const binding of allBindings) {
      binding.mutator(binding.dataFn(newScope));
    }
  };
}