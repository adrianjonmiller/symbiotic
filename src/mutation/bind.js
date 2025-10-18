import { parseDataBind } from './parseDataBind.js';
import { parseDataBindExpression } from './parseDataBindExpression.js';
import { createMutator } from './createMutator.js';
import { specialHandlers } from './specialHandlers.js';

/**
 * bind(element, data)
 * 
 * Binds data to an element and all its descendants.
 * Returns an update function that can be called with new data.
 * 
 * @param {HTMLElement} element - The element to bind data to
 * @param {Object} data - The data object to bind
 */
export function bind(element, data) {
  const bindings = [];
  
  // Traverse the tree and collect all bindings
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_ELEMENT,
    null,
    false
  );
  
  let node = element.nodeType === 1 ? element : null;
  if (node) collectBindings(node);
  
  while ((node = walker.nextNode())) {
    collectBindings(node);
  }
  
  function collectBindings(el) {
    const elementBindings = parseDataBind(el);
    for (const binding of elementBindings) {
      const { property, path } = binding;
      const dataFn = parseDataBindExpression(path);
      
      // Get special handler if available
      const specialHandler = specialHandlers[property] || null;
      
      const mutator = createMutator(el, property, undefined, null, specialHandler);
      
      bindings.push({ dataFn, mutator });
    }
  }
  
  // Return update function
  return function update(newData) {
    for (const { dataFn, mutator } of bindings) {
      const value = dataFn(newData);
      mutator(value);
    }
  };
}