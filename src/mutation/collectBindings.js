import { parseDataBind } from './parseDataBind.js';
import { parseDataBindExpression } from './parseDataBindExpression.js';
import { createMutator } from './createMutator.js';

export function collectBindings(el) {
  // 1. Get all data-bind attributes from this element
  const elementBindings = parseDataBind(el);
  
  // 2. For each binding, create the necessary functions
  for (const binding of elementBindings) {
    const { property, path, transform } = binding;
    
    // 3. Create a function that extracts the value from data
    const dataFn = parseDataBindExpression(path);
    
    // 4. Create a function that updates the DOM element
    const mutator = createMutator(el, property, undefined, transform);
    
    // 5. Store both functions together
    bindings.push({ dataFn, mutator });
  }
}