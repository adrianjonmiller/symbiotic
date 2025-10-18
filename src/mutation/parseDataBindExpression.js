import { createGetter } from './createGetter.js';
import { getTransform } from './transforms.js';

export function parseDataBindExpression(expression) {
  if (!expression || expression === '.') return (data) => data;
  
  // Check if it's a simple path
  const isSimplePath = /^[a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*$/.test(expression);
  
  if (isSimplePath) {
    // Use createGetter for simple paths (fast, cached)
    return createGetter(expression);
  } else {
    // Create expression function that takes data as parameter
    // Replace variable references with data.property
    const sanitized = expression
      .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, 'data.$1')
      .replace(/data\.data\./g, 'data.');
    
    return new Function('data', `return ${sanitized};`);
  }
}