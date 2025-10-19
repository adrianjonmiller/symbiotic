/**
 * Updates an element's property or attribute
 * @param {HTMLElement} element - The element to update
 * @param {string} property - The property/attribute name
 * @param {any} value - The value to set
 * @param {Function} [transform] - Optional transform function
 */

const changeQueue = new Set();
let flushScheduled = false;

export function addToChangeQueue(fn) {
  changeQueue.add(fn);
  if (!flushScheduled) {
    flushScheduled = true;
    requestAnimationFrame(flush);
  }
}

function flush() {
  changeQueue.forEach(fn => fn());
  changeQueue.clear();
  flushScheduled = false;
}