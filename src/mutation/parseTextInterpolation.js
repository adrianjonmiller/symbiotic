import { parseExpression } from './parseExpression.js';

/**
 * Parse text content for interpolation expressions like {{ expression }}
 * @param {string} text - The text content to parse
 * @returns {Array} Array of text segments and expression functions
 */
export function parseTextInterpolation(text, scope) {
  if (!text || typeof text !== 'string') {
    return [{ type: 'text', content: text }];
  }

  const segments = [];
  const interpolationRegex = /\{\{([^}]+)\}\}/g;
  let lastIndex = 0;
  let match;

  while ((match = interpolationRegex.exec(text)) !== null) {
    // Add text before the interpolation
    if (match.index > lastIndex) {
      const textContent = text.slice(lastIndex, match.index);
      if (textContent) {
        segments.push({ type: 'text', content: textContent });
      }
    }

    // Add the interpolation expression
    const expression = match[1].trim();
    if (expression) {
      try {
        const expressionFn = parseExpression(expression, scope);
        segments.push({ type: 'expression', expression: expressionFn });
      } catch (error) {
        console.warn(`Invalid interpolation expression: ${expression}`, error);
        segments.push({ type: 'text', content: match[0] });
      }
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last interpolation
  if (lastIndex < text.length) {
    const textContent = text.slice(lastIndex);
    if (textContent) {
      segments.push({ type: 'text', content: textContent });
    }
  }

  // If no interpolations found, return the original text
  if (segments.length === 0) {
    segments.push({ type: 'text', content: text });
  }

  return segments;
}

/**
 * Evaluate interpolated text with given scope
 * @param {Array} segments - Parsed text segments
 * @param {Object} scope - The scope object to evaluate expressions against
 * @returns {string} The evaluated text content
 */
export function evaluateTextInterpolation(segments, scope) {
  return segments.map(segment => {
    if (segment.type === 'text') {
      return segment.content;
    } else if (segment.type === 'expression') {
      try {
        const value = segment.expression(scope);
        return value != null ? String(value) : '';
      } catch (error) {
        console.warn('Error evaluating interpolation expression:', error);
        return '';
      }
    }
    return '';
  }).join('');
}

/**
 * Create a function that evaluates interpolated text
 * @param {string} text - The text content to parse
 * @returns {Function} A function that takes scope and returns evaluated text
 */
export function createTextInterpolation(text, initialScope) {
  const segments = parseTextInterpolation(text, initialScope);
  
  return function evaluate(scope) {
    return evaluateTextInterpolation(segments, scope);
  };
}
