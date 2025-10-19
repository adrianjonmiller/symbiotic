/**
 * Updates an element's property or attribute
 * @param {HTMLElement} element - The element to update
 * @param {string} property - The property/attribute name
 * @param {any} value - The value to set
 * @param {Function} [transform] - Optional transform function
 */

import { addToChangeQueue } from './mutation/changeQueue.js';

export function destroy(el) {
  if (!el) return;
  let resurrect, remove;
  let destroyed = true;
  const placeholder = document.createComment('placeholder');
  
  // Initially destroy the element (batched)
  addToChangeQueue(() => el.replaceWith(placeholder));

  remove = () => {
    if (destroyed) return;
    addToChangeQueue(() => el.replaceWith(placeholder));
    destroyed = true;
    return resurrect;
  }

  resurrect = () => {
    if (!destroyed) return;
    addToChangeQueue(() => placeholder.replaceWith(el));
    destroyed = false;
    return remove;
  }

  return resurrect;
}


export function batch(fn) {
  return new Promise((resolve) => {
    addToChangeQueue(() => {
      fn();
      resolve();
    });
  });
}