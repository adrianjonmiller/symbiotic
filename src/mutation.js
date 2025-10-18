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
  return () => {
    changeQueue.delete(fn);
  };
}

function flush() {
  changeQueue.forEach(fn => fn());
  changeQueue.clear();
  flushScheduled = false;
}

export function destroy(el) {
  if (!el) return;
  let resurrect, remove;
  let destroyed = true;
  const placeholder = document.createComment('symbiote-placeholder');
  
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

export function createMutator(element, property, startingValue = undefined, transform = null) {
  if (!element) return;
  
  let lastValue;
  
  // Apply transform if provided
  const mutator = (value) => {
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
    return mutator;
  }
  
  if (startingValue !== undefined) {
    // Set initial value immediately (not batched)
    if (lastValue === startingValue) return mutator;
    const currentValue = element[property];
    const finalValue = transform ? transform(startingValue, currentValue) : startingValue;
    
    // Handle special properties immediately
    switch (property) {
      case 'textContent':
        element.textContent = finalValue;
        break;
      case 'innerHTML':
        element.innerHTML = finalValue;
        break;
      case 'class':
        element.className = finalValue;
        break;
      case 'hidden':
        element.hidden = !!finalValue;
        break;
      default:
        if (property.startsWith('data-')) {
          element.setAttribute(property, finalValue);
        } else {
          element[property] = finalValue;
        }
        break;
    }
    lastValue = startingValue;
  }

  return mutator;
}


