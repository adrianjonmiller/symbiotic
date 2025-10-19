import { getBindings } from './getBindings.js';
import { createMutator } from './createMutator.js';
import { hasRepeat, isTemplate, createRepeatConfig, repeat } from './repeat.js';


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
  if (isTemplate(element) && hasRepeat(element)) {
    const config = createRepeatConfig(element, data, inject); 
    if (config) {
      const repeatUpdateFn = repeat(element, config);
      
      // Return a wrapper function that extracts the correct data
      return function update(newData) {
        const newConfig = createRepeatConfig(element, newData, inject);
        if (newConfig) {
          repeatUpdateFn(newConfig.data);
        }
      };
    }
  }
  
  // Regular element binding
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
    // Check if this is a repeat template
    const repeatConfig = createRepeatConfig(el, data, inject);
    if (repeatConfig) {
      // Handle repeat template - this will create its own update function
      const repeatUpdateFn = repeat(el, repeatConfig);
      allBindings.push({
        element: el,
        mutator: repeatUpdateFn,
        dataFn: () => data // Repeat handles its own data
      });
      return; // Don't process children of repeat templates
    }
    
    // Regular element - get its bindings
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
    // Use binding.node if it exists (for text nodes), otherwise use binding.element
    const target = binding.node || binding.element;
    binding.mutator = createMutator(target, binding.property, initialValue);
  }
  
  // Return update function
  return function update(newData) {
    const newScope = createScope(newData);
    for (const binding of allBindings) {
      binding.mutator(binding.dataFn(newScope));
    }
  };
}