/**
 * Updates an element's property or attribute
 * @param {HTMLElement} element - The element to update
 * @param {string} property - The property/attribute name
 * @param {any} value - The value to set
 * @param {Function} [transform] - Optional transform function
 */

const changeQueue = new Set();
let flushScheduled = false;

function addToChangeQueue(fn) {
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

/**
 * Updates an element's property or attribute with special handling
 * @param {HTMLElement} element - The element to update
 * @param {string} property - The property/attribute name
 * @param {any} value - The value to set
 * @param {Function} [transform] - Optional transform function
 * @param {Function} [specialHandler] - Optional special handler function
 */
export function createMutator(el, name, initial, transform, specialHandler) {
  if (!(el instanceof Element)) return () => {};

  let last;
  const apply = (val) => {
    const current = el.getAttribute(name);
    const next = transform ? transform(val, current) : val;
    
    if (next === last) return;
    last = next;

    // Use special handler if provided, otherwise default behavior
    if (specialHandler) {
      specialHandler(el, name, next);
    } else {
      // Default behavior
      if (next == null) {
        addToChangeQueue(() => el.removeAttribute(name));
      } else {
        addToChangeQueue(() => el.setAttribute(name, String(next)));
      }
    }
  };

  if (initial !== undefined) apply(initial);
  return (next) => apply(next);
}



