const globalTransforms = new Map();

/**
 * registerTransform(name, fn)
 * 
 * Register a transform function globally.
 */
export function registerTransform(name, fn) {
  globalTransforms.set(name, fn);
}

/**
 * getTransform(name)
 * 
 * Get a transform function by name from global registry.
 */
export function getTransform(name) {
  return globalTransforms.get(name);
}

/**
 * hasTransform(name)
 * 
 * Check if a transform is registered globally.
 */
export function hasTransform(name) {
  return globalTransforms.has(name);
}

// Register some common global transforms
registerTransform('uppercase', (value) => String(value).toUpperCase());
registerTransform('lowercase', (value) => String(value).toLowerCase());
registerTransform('currency', (value) => `$${Number(value).toFixed(2)}`);
registerTransform('capitalize', (value) => String(value).charAt(0).toUpperCase() + String(value).slice(1));
registerTransform('date', (value) => new Date(value).toLocaleDateString());
registerTransform('phone', (value) => value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'));
registerTransform('truncate', (value, length = 50, suffix = '...') => {
  const str = String(value);
  return str.length > length ? str.slice(0, length) + suffix : str;
});
registerTransform('format', (value, decimals = 2, symbol = '$') => {
  return `${symbol}${Number(value).toFixed(decimals)}`;
});
registerTransform('pad', (value, length = 10, char = ' ', direction = 'start') => {
  const str = String(value);
  return direction === 'start' ? str.padStart(length, char) : str.padEnd(length, char);
});
registerTransform('replace', (value, search, replacement) => {
  return String(value).replace(new RegExp(search, 'g'), replacement);
});