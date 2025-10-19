import { createTextInterpolation } from './parseTextInterpolation.js';
import { parseExpression } from './parseExpression.js';


export function getBindings(element, scope) {
  const bindings = [];
  
  // Check if element has attributes property
  if (!element.attributes) return bindings;
  
  const attributes = element.attributes;
  
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    if (attr.name.startsWith('data-bind:')) {
      const property = attr.name.slice(10); // Keep original case
      const expression = attr.value.trim();
      const dataFn = parseExpression(expression, scope);
      
      bindings.push({
        property,
        dataFn,
      });
    }
  }
  
  // Check if element's textContent contains interpolation syntax
  const textContent = element.textContent.trim();
  if (textContent && textContent.includes('{{') && textContent.includes('}}')) {
    // Only bind text interpolation if the element has no child elements (leaf node)
    const hasChildElements = element.children && element.children.length > 0;
    if (!hasChildElements) {
      // Create text interpolation function
      const dataFn = createTextInterpolation(textContent, scope);
      
      bindings.push({
        property: 'textcontent',
        dataFn,
      });
    }
  }
  
  return bindings;
}