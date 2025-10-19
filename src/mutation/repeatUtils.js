/**
 * Check if element is a template
 */
function isTemplate(element) {
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
      collection: collection,      // 'items' or 'Object.keys(users)'
      keyPath: keyVar,            // 'key' or 'index'
      operator: operator          // 'of' or 'in'
    };
  }
  
  // Check for single variable syntax: item of/in collection
  const singleMatch = repeatAttr.match(/^(\w+)\s+(of|in)\s+(.+)$/);
  if (singleMatch) {
    const [, variable, operator, collection] = singleMatch;
    return {
      itemVar: variable,          // 'item' or 'index'
      collection: collection,      // 'items' or 'Object.keys(users)'
      keyPath: variable,          // 'item' or 'index'
      operator: operator          // 'of' or 'in'
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
