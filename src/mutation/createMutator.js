import { addToChangeQueue } from './changeQueue.js';
import { getHandler } from './getHandler.js';

/**
 * Updates an element's property or attribute with special handling
 * @param {HTMLElement} element - The element to update
 * @param {string} property - The property/attribute name
 * @param {any} value - The value to set
 * @param {Function} [transform] - Optional transform function
 * @param {Function} [specialHandler] - Optional special handler function
 */

export function createMutator(el, name, initial, transform) {
  if (!(el instanceof Element) && !(el instanceof Text)) return () => {};

  let last;
  const handler = getHandler(name);
  const apply = (val) => {
    const current = el[name] || (el.getAttribute ? el.getAttribute(name) : undefined);
    const next = transform ? transform(val, current) : val;
    
    if (next === last) return;
    last = next;

    addToChangeQueue(() => handler(el, next));
  };

  if (initial !== undefined) {
    // Apply initial value synchronously
    last = transform ? transform(initial, el[name] || (el.getAttribute ? el.getAttribute(name) : undefined)) : initial;
    if (name === 'data-test') {
      console.log(handler, name, last, initial);
    }
    handler(el, last);
  }
  return apply
}



