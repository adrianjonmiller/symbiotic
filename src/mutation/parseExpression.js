// Cache for compiled expressions
const expressionCache = new Map();

// Allowed characters for safe expressions
const SAFE_CHARS = /^[a-zA-Z0-9_$.\s+\-*/%<>=!&|?:()\[\]'",`{}]+$/;

export function parseExpression(expression, scope) {
  if (!expression || expression === '.') return (scope) => scope;
  
  // Check cache first
  if (expressionCache.has(expression)) {
    return expressionCache.get(expression);
  }
  
  // Security check: only allow safe characters
  if (!SAFE_CHARS.test(expression)) {
    throw new Error(`Unsafe expression: ${expression}`);
  }
  
  // Additional security: check for dangerous patterns
  const dangerousPatterns = [
    /eval\s*\(/i,
    /Function\s*\(/i,
    /setTimeout\s*\(/i,
    /setInterval\s*\(/i,
    /document\./i,
    /window\./i,
    /global\./i,
    /process\./i,
    /require\s*\(/i,
    /import\s+/i,
    /__proto__/i,
    /constructor/i,
    /prototype/i
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(expression)) {
      throw new Error(`Potentially dangerous expression: ${expression}`);
    }
  }
  
  // Create expression function that has scope variables available as globals
  // This allows complex expressions like arrow functions to work naturally
  
  const fn = createExpressionFunction(expression, scope);
  
  // Cache the function
  expressionCache.set(expression, fn);
  
  return fn;
}

function createExpressionFunction(expression, scope) {
  if (scope && Object.keys(scope).length > 0) {
    const scopeKeys = Object.keys(scope);
    const fnCode = 
      'try {\n' +
      '  // Make all scope properties available as local variables\n' +
      '  const { ' + scopeKeys.join(', ') + ' } = $scope || {};\n' +
      '  return (' + expression + ');\n' +
      '} catch (error) {\n' +
      '  console.error("Error evaluating expression: ' + expression.replace(/"/g, '\\"') + '", error);\n' +
      '  return null;\n' +
      '}';
    return new Function('$scope', fnCode);
  } else {
    return new Function('$scope', 'return (' + expression + ');');
  }
}