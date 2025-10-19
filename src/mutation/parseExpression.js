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

function createExpressionFunction(expression, scope, keys = {$item: '$item', $key: '$key', $index: '$index', $scope: '$scope'}) {
  if (scope && Object.keys(scope).length > 0) {
    const scopeKeys = Object.keys(scope);
    // Filter out fixed scope variables to avoid conflicts
    const filteredScopeKeys = scopeKeys.filter(key => !['$item', '$key', '$index'].includes(key));
    const fnCode = 
      `try {\n` +
      `  // Make all scope properties available as local variables\n` +
      `  const { ${filteredScopeKeys.join(', ')} } = ${keys.$scope} || {};\n` +
      `  // Make fixed scope variables available\n` +
      `  const ${keys.$item} = ${keys.$scope}.${keys.$item} || null;\n` +
      `  const ${keys.$key} = ${keys.$scope}.${keys.$key} || null;\n` +
      `  const ${keys.$index} = ${keys.$scope}.${keys.$index} || null;\n` +
      `  return (${expression});\n` +
      `} catch (error) {\n` +
      `  console.error("Error evaluating expression: ${expression.replace(/"/g, '\\"')}", error);\n` +
      `  return null;\n` +
      `}`;
    return new Function(keys.$scope, fnCode);
  } else {
    const fnCode = 
      `try {\n` +
      `  // Make fixed scope variables available\n` +
      `  const ${keys.$item} = ${keys.$scope}.${keys.$item} || null;\n` +
      `  const ${keys.$key} = ${keys.$scope}.${keys.$key} || null;\n` +
      `  const ${keys.$index} = ${keys.$scope}.${keys.$index} || null;\n` +
      `  return (${expression});\n` +
      `} catch (error) {\n` +
      `  console.error("Error evaluating expression: ${expression.replace(/"/g, '\\"')}", error);\n` +
      `  return null;\n` +
      `}`;
    return new Function(keys.$scope, fnCode);
  }
}