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

export function createMutator(element, property, startingValue = undefined, transform = null) {
  if (!element) return;
  
  let lastValue;
  
  // Apply transform if provided
  const bindFunction = (value) => {
    if (value === undefined) {
      return element[property];
    }

    if (lastValue === value) return;
    const currentValue = element[property];
    const finalValue = transform ? transform(value, currentValue) : value;
  
    // Handle special properties
    switch (property) {
      case 'textContent':
        addToChangeQueue(() => element.textContent = finalValue);
        break;
      case 'innerHTML':
        addToChangeQueue(() => element.innerHTML = finalValue);
        break;
      case 'class':
        addToChangeQueue(() => element.className = finalValue);
        break;
      case 'hidden':
        addToChangeQueue(() => element.hidden = !!finalValue);
        break;
      default:
        if (property.startsWith('data-')) {
          addToChangeQueue(() => element.setAttribute(property, finalValue));
        } else {
          addToChangeQueue(() => element[property] = finalValue);
        }
        break;
    }
    lastValue = value;
  }
  if (startingValue !== undefined) {
    bindFunction(startingValue);
  }
  return bindFunction;
}


