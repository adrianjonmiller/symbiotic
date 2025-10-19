import { parseExpression } from './parseExpression.js';
import { addToChangeQueue } from './changeQueue.js';
import { parseRepeat } from './repeatUtils.js';
import { getBindings } from './getBindings.js';
import { createMutator } from './createMutator.js';


function getRepeatData(repeatInfo, scope) {
  const { collection, operator } = repeatInfo;
  
  // Get the raw collection data
  let collectionData;
  if (collection.includes('.')) {
    const collectionFn = parseExpression(collection, scope);
    collectionData = collectionFn(scope) || [];
  } else {
    collectionData = scope[collection] || [];
  }
  
  // Handle different operators
  if (operator === 'in') {
    // For 'in', iterate over keys/indices
    if (Array.isArray(collectionData)) {
      return collectionData.map((_, index) => index);
    } else if (typeof collectionData === 'object' && collectionData !== null) {
      return Object.keys(collectionData);
    }
    return [];
  } else {
    // For 'of', iterate over values (default behavior)
    return collectionData;
  }
}

/**
 * Get the actual value when using 'in' operator
 */
function getActualValue(scope, collection, key) {
  // Get the raw collection data
  let collectionData;
  if (collection.includes('.')) {
    const collectionFn = parseExpression(collection, scope);
    collectionData = collectionFn(scope) || [];
  } else {
    collectionData = scope[collection] || [];
  }
  
  // Return the value at the key/index
  return collectionData[key];
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
 * Extract key from item using keyPath
 */
function getKeyFromItem(item, keyPath, itemVar, keyVar = null, key = null, scope = {}) {
  // For destructured syntax, we have both key and item
  if (keyVar && key !== null) {
    const itemScope = { ...scope, [keyVar]: key, [itemVar]: item };
    const keyFn = parseExpression(keyPath, itemScope);
    return keyFn(itemScope);
  }
  
  // For single variable syntax, use item as key or evaluate keyPath
  const itemScope = { ...scope, [itemVar]: item };
  const keyFn = parseExpression(keyPath, itemScope);
  return keyFn(itemScope);
}

/**
 * Local binding function to avoid circular dependency
 */
function bindElement(element, data) {
  const bindings = getBindings(element, data);
  const mutators = [];
  
  for (const binding of bindings) {
    const initialValue = binding.dataFn(data);
    const mutator = createMutator(element, binding.property, initialValue);
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

export function repeat(element, data, inject = {}) {
  
  const createScope = (data) => ({ ...data, ...inject });
  const repeatInfo = parseRepeat(element);
  const scope = createScope(data);
  const repeatData = getRepeatData(repeatInfo, scope);
  const repeated = new Map();
  const parent = element.parentNode;
  let insertAfter = element;

  console.log('repeatData', repeatData);

  // Initial render - create all elements
  for (let i = 0; i < repeatData.length; i++) {
    const item = repeatData[i];
    const key = repeatInfo.keyVar ? i : item; // For destructured syntax, use index as key
    
    // Create item scope based on operator
    let itemScope;
    if (repeatInfo.operator === 'in') {
      if (repeatInfo.keyVar) {
        // Destructured syntax: (key, item) in collection
        // key gets the key/index, item gets the actual value
        const actualValue = getActualValue(scope, repeatInfo.collection, item);
        itemScope = { 
          ...scope,  // Include all original scope variables (like 'items')
          [repeatInfo.itemVar]: actualValue,  // itemVar gets the actual value
          [repeatInfo.keyVar]: item  // keyVar gets the key/index
        };
      } else {
        // Single variable syntax: item in collection
        // item gets the key/index
        itemScope = { 
          ...scope,  // Include all original scope variables (like 'items')
          [repeatInfo.itemVar]: item  // itemVar gets the key/index
        };
      }
    } else {
      // For 'of', the item is the value
      itemScope = { 
        ...scope,  // Include all original scope variables
        [repeatInfo.itemVar]: item,
        ...(repeatInfo.keyVar ? { [repeatInfo.keyVar]: key } : {})
      };
    }
    
    const uniqueKey = getKeyFromItem(item, repeatInfo.keyPath, repeatInfo.itemVar, repeatInfo.keyVar, key, itemScope);
    const { fragment, elements, updateFn } = createRepeatItem(element, itemScope);

    repeated.set(uniqueKey, { elements, updateFn });
    
    // Capture current insertAfter value for the closure
    const currentInsertAfter = insertAfter;
    addToChangeQueue(() => {
      parent.insertBefore(fragment, currentInsertAfter.nextSibling);
    });
    
    // Update insertAfter synchronously for next iteration
    if (elements.length > 0) {
      insertAfter = elements[elements.length - 1];
    }
  }

  return function update(newData) {
    const newScope = createScope(newData);
    const newRepeatData = getRepeatData(repeatInfo, newScope);
    const newKeys = new Set();
    const newKeyOrder = [];
    
    // Build new key set and order
    for (let i = 0; i < newRepeatData.length; i++) {
      const item = newRepeatData[i];
      const key = repeatInfo.keyVar ? i : item;
      const uniqueKey = getKeyFromItem(item, repeatInfo.keyPath, repeatInfo.itemVar, repeatInfo.keyVar, key);
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
    let currentInsertAfter = element;
    
    for (let i = 0; i < newRepeatData.length; i++) {
      const item = newRepeatData[i];
      const key = repeatInfo.keyVar ? i : item;
      const uniqueKey = getKeyFromItem(item, repeatInfo.keyPath, repeatInfo.itemVar, repeatInfo.keyVar, key);
      
      // Create item scope based on operator
      let itemScope;
      if (repeatInfo.operator === 'in') {
        if (repeatInfo.keyVar) {
          // Destructured syntax: (key, item) in collection
          // key gets the key/index, item gets the actual value
          const actualValue = getActualValue(newScope, repeatInfo.collection, item);
          itemScope = { 
            ...newScope,  // Include all original scope variables (like 'items')
            [repeatInfo.itemVar]: actualValue,  // itemVar gets the actual value
            [repeatInfo.keyVar]: item  // keyVar gets the key/index
          };
        } else {
          // Single variable syntax: item in collection
          // item gets the key/index
          itemScope = { 
            ...newScope,  // Include all original scope variables (like 'items')
            [repeatInfo.itemVar]: item  // itemVar gets the key/index
          };
        }
      } else {
        // For 'of', the item is the value
        itemScope = { 
          ...newScope,  // Include all original scope variables
          [repeatInfo.itemVar]: item,
          ...(repeatInfo.keyVar ? { [repeatInfo.keyVar]: key } : {})
        };
      }
      
      if (repeated.has(uniqueKey)) {
        // Element exists - check if it needs to be moved
        const { elements: existingElements, updateFn } = repeated.get(uniqueKey);
        
        // Check if first element is in correct position
        const firstElement = existingElements[0];
        const shouldBeAfter = i === 0 ? element : currentInsertAfter;
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
        const { fragment, elements, updateFn } = createRepeatItem(element, itemScope);

        repeated.set(uniqueKey, { elements, updateFn });
        
        const capturedInsertAfter = currentInsertAfter;
        addToChangeQueue(() => {
          parent.insertBefore(fragment, capturedInsertAfter.nextSibling);
        });
        
        currentInsertAfter = elements[elements.length - 1];
      }
    }
  };
}

/**
 * Create repeat bindings for template element
 */
export function createRepeatBindings(element, repeatInfo) {
  // Get the template content as a document fragment
  const templateContent = element.content.cloneNode(true);
  
  // Store template info
  return {
    type: 'repeat',
    element,                    // The <template> element
    templateContent,           // Cloned template content
    itemVar: repeatInfo.itemVar,
    collection: repeatInfo.collection,
    keyPath: repeatInfo.keyPath
  };  
}



/**
 * Get repeat info from element
 */
export function getRepeatInfo(element) {
  return parseRepeat(element);
}
