import { parseExpression } from './parseExpression.js';
import { addToChangeQueue } from './changeQueue.js';
import { getBindings } from './getBindings.js';
import { createMutator } from './createMutator.js';
import { createGetter } from './createGetter.js';

/**
 * Check if element is a template
 */
export function isTemplate(element) {
  return element && element.tagName && element.tagName.toLowerCase() === 'template';
}

/**
 * Parse repeat attribute to extract iteration details
 * @param {HTMLElement} element - The element with data-repeat attribute
 * @returns {Object|null} - Parsed repeat configuration or null if not a repeat element
 */
export function parseRepeat(element) {
  if (!isTemplate(element)) return null;
  
  const repeatAttr = element.getAttribute('data-repeat');
  if (!repeatAttr) return null;
  
  // Parse different syntaxes:
  // "item of items" -> iterate over values (like for...of)
  // "index in items" -> iterate over keys/indices (like for...in)
  // "(key, item) of items" -> destructured with both key and value
  // "(index, item) in items" -> destructured with index and value
  
  // Check for destructured syntax: (key, item) of/in collection
  const destructuredMatch = repeatAttr.match(/^\((\w+),\s*(\w+)\)\s+(of|in)\s+(.+)$/);
  if (destructuredMatch) {
    const [, keyVar, itemVar, operator, collection] = destructuredMatch;
    return {
      itemVar: itemVar,           // 'item'
      keyVar: keyVar,             // 'key' or 'index'
      collection: collection,      // 'items' or '$scope.items'
      keyPath: keyVar,            // 'key' or 'index'
      operator: 'of'              // Always use 'of' for consistency
    };
  }
  
  // Check for single variable syntax: item of/in collection
  const singleMatch = repeatAttr.match(/^(\w+)\s+(of|in)\s+(.+)$/);
  if (singleMatch) {
    const [, variable, operator, collection] = singleMatch;
    return {
      itemVar: variable,          // 'item' or 'index'
      collection: collection,      // 'items' or '$scope.items'
      keyPath: 'index',           // Use index-based keying for single variable syntax
      operator: 'of'              // Always use 'of' for consistency
    };
  }
  
  // Check for simple data reference: data or data.property or $scope.data
  const simpleMatch = repeatAttr.match(/^([\w.$]+)$/);
  if (simpleMatch) {
    const [, collection] = simpleMatch;
    return {
      itemVar: 'item',           // Default to 'item'
      collection: collection,     // The data reference (e.g., 'items' or '$scope.items')
      keyPath: 'index',          // Default to index-based keying
      operator: 'of'             // Default to 'of' operator
    };
  }
  
  return null;
}

/**
 * Check if element has repeat attributes
 */
export function hasRepeat(element) {
  return parseRepeat(element) !== null;
}

/**
 * Parse repeat attributes and convert to repeat config
 * @param {HTMLElement} element - The element with data-repeat attribute
 * @param {Object} data - The data object
 * @param {Object} inject - The inject object
 * @returns {Object|null} - The repeat config or null if not a repeat element
 */
export function createRepeatConfig(element, data, inject = {}) {
  // First check if element is a template
  if (!isTemplate(element)) return null;
  
  // Then check if it has repeat attributes
  if (!hasRepeat(element)) return null;
  
  const repeatInfo = parseRepeat(element);
  if (!repeatInfo) return null;
  
  // Handle $scope syntax by stripping the prefix
  let collectionPath = repeatInfo.collection;
  if (collectionPath.startsWith('$scope.')) {
    collectionPath = collectionPath.substring(7); // Remove '$scope.' prefix
  }
  
  // Use createGetter for dot syntax support
  const getData = createGetter(collectionPath);
  
  // Convert repeat info to config format
  return {
    data: getData(data) || [],
    key: repeatInfo.keyPath === 'index' ? null : repeatInfo.keyPath,
    itemKey: repeatInfo.itemVar,
    inject: inject
  };
}



function walkTemplate(templateContent, callback) {
  // Handle DocumentFragment by recursively walking through all elements
  if (templateContent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    // Walk through all child elements recursively
    const walkElement = (element) => {
      callback(element);
      for (const child of element.children) {
        walkElement(child);
      }
    };
    
    for (const child of templateContent.children) {
      walkElement(child);
    }
  } else {
    // For regular elements, use TreeWalker
    const walker = document.createTreeWalker(
      templateContent,
      NodeFilter.SHOW_ELEMENT,
      null,
      false
    );

    let node;
    while ((node = walker.nextNode())) {
      callback(node);
    }
  }
}


/**
 * Local binding function to avoid circular dependency
 */
function bindElement(element, data) {
  const bindings = getBindings(element, data);
  const mutators = [];
  
  for (const binding of bindings) {
    const initialValue = binding.dataFn(data);
    // For text node bindings, use the text node itself, otherwise use the element
    const targetElement = binding.property === 'textnode' ? binding.node : element;
    const mutator = createMutator(targetElement, binding.property, initialValue);
    mutators.push(mutator);
  }
  
  return function update(newData) {
    for (const binding of bindings) {
      const newValue = binding.dataFn(newData);
      const mutator = mutators[bindings.indexOf(binding)];
      mutator(newValue);
    }
  };
}

/**
 * Create a repeat item element with bindings
 */
function createRepeatItem(template, itemScope) {
  const fragment = template.content.cloneNode(true);
  
  // Store references to the actual elements before they're moved from the fragment
  const elements = Array.from(fragment.children);
  
  const updateFns = new Set();
  walkTemplate(fragment, (child) => {
    updateFns.add(bindElement(child, itemScope));
  });

  const updateFn = (newItemScope) => {
    for (const fn of updateFns) {
      fn(newItemScope);
    }
  };

  return { fragment, elements, updateFn };
}

export function repeat(elementOrSelector, config, onMount) {
  const { template, data, inject = {}, parent = null, after = null, keyGetter = null, itemKey = 'item', keyKey = 'key' } = normalizeConfig(elementOrSelector, config);
  
  const repeated = new Map();
  let insertAfter = after || template;
  let length = data.length;

  // Initial render - create all elements
  for (let i = 0; i < length; i++) {
    const [key, item] = data[i];
    const itemScope = {
      data: data,
      [itemKey]: item,
      index: i,
      $item: item,
      $key: keyGetter ? keyGetter(item) : key,
      $index: i,
      ...inject,
    }
    itemScope.key = keyGetter ? keyGetter(item) : key;
    const { fragment, elements, updateFn } = createRepeatItem(template, itemScope);
    repeated.set(itemScope.key, { elements, updateFn });
    
    // Capture current insertAfter value for the closure
    const currentInsertAfter = insertAfter;
    addToChangeQueue(() => {
      parent.insertBefore(fragment, currentInsertAfter.nextSibling);
      onMount?.(fragment, itemScope);
    });
    
    // Update insertAfter synchronously for next iteration
    if (elements.length > 0) {
      insertAfter = elements[elements.length - 1];
    }
  }

  return function update(newData) {
    // Normalize new data to the same format as initial render
    const normalizedNewData = normalizeData(newData, keyGetter);
    const newKeys = new Set();
    const newKeyOrder = [];
    
    // Build new key set and order
    for (let i = 0; i < normalizedNewData.length; i++) {
      const [key, item] = normalizedNewData[i];
      const uniqueKey = keyGetter ? keyGetter(item) : key;
      newKeys.add(uniqueKey);
      newKeyOrder.push(uniqueKey);
    }

    // Phase 1: Remove elements that are no longer in new data
    for (const [key, { elements }] of repeated) {
      if (!newKeys.has(key)) {
        addToChangeQueue(() => {
          // Remove all elements for this item
          for (const el of elements) {
            if (el.parentNode) {
              el.parentNode.removeChild(el);
            }
          }
        });
        repeated.delete(key);
      }
    }

    // Phase 2: Process new data array in order
    let currentInsertAfter = template;
    
    for (let i = 0; i < normalizedNewData.length; i++) {
      const [key, item] = normalizedNewData[i];
      const itemScope = {
        data: normalizedNewData,
        [itemKey]: item,
        index: i,
        $item: item,
        $key: keyGetter ? keyGetter(item) : key,
        $index: i,
        ...inject,
      };
      const uniqueKey = keyGetter ? keyGetter(item) : key;
      
      if (repeated.has(uniqueKey)) {
        // Element exists - check if it needs to be moved
        const { elements: existingElements, updateFn } = repeated.get(uniqueKey);
        
        // Check if first element is in correct position
        const firstElement = existingElements[0];
        const shouldBeAfter = i === 0 ? template : currentInsertAfter;
        const actualPrevious = firstElement ? firstElement.previousSibling : null;
        
        if (firstElement && actualPrevious !== shouldBeAfter) {
          // Move all elements to correct position
          const capturedShouldBeAfter = shouldBeAfter;
          addToChangeQueue(() => {
            let insertPoint = capturedShouldBeAfter.nextSibling;
            for (const el of existingElements) {
              if (el.parentNode) {
                parent.insertBefore(el, insertPoint);
                insertPoint = el.nextSibling;
              }
            }
          });
        }
        
        // Update the element with new data
        updateFn(itemScope);
        currentInsertAfter = existingElements[existingElements.length - 1];
        
      } else {
        // New element - create and insert
        const { fragment, elements, updateFn } = createRepeatItem(template, itemScope);

        repeated.set(uniqueKey, { elements, updateFn });
        
        const capturedInsertAfter = currentInsertAfter;
        addToChangeQueue(() => {
          parent.insertBefore(fragment, capturedInsertAfter.nextSibling);
          onMount?.(fragment, itemScope);
        });
        
        currentInsertAfter = elements[elements.length - 1];
      }
    }
  };
}


function getTemplate(template) {
  if (typeof template === 'string') {
    if (template.startsWith('.') || template.startsWith('#')) {
      return document.querySelector(template);
    } else {
      const element = document.createElement('template');
      element.content.innerHTML = template;
      return element;
    }
  }
  return template;
}

function resolveElement(elementOrSelector, fallback) {
  if (!elementOrSelector) return fallback;
  if (elementOrSelector instanceof HTMLElement) return elementOrSelector;
  if (typeof elementOrSelector === 'string') {
    const found = document.querySelector(elementOrSelector);
    return found || fallback;
  }
  return fallback;
}

function normalizeConfig(template, config) {
  let { data, parent, after, key, itemKey, keyKey } = config;
  template = getTemplate(template);
  parent = resolveElement(parent, template.parentNode);
  after = resolveElement(after, template);
  itemKey = itemKey || 'item';
  keyKey = keyKey || 'key';
  
  const keyGetter = key ? createGetter(key) : null;
  data = normalizeData(data, keyGetter);
  
  // Validate parent/after relationship
  if (parent && after) {
    after = resolveElement(after, template);
    parent = resolveElement(parent, template.parentNode);
  }
  
  return {
    template,
    parent,
    after,
    data,
    key,
    itemKey,
    keyKey,
    keyGetter: keyGetter
  };
}

function normalizeData(data, keyGetter = null) {
  // Normalize data to entries format
  if (Array.isArray(data)) {
    // For arrays: use keyGetter if available, otherwise use index
    if (keyGetter) {
      return data.map((item, index) => {
        const key = keyGetter(item);
        return [key, item];
      });
    } else {
      return data.map((item, index) => [index, item]);
    }
  } else if (data && typeof data === 'object') {
    // For objects: [['key1', value1], ['key2', value2]]
    return Object.entries(data);
  } else {
    // Handle other cases (null, undefined, etc.)
    return [];
  }
}

