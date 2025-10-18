const setterCache = new Map();

/**
 * createSetter(path)
 * Returns a compiled function for assigning nested values.
 * Example:
 *   const setFoo = createSetter('foo.bar.baz')
 *   setFoo(obj, 123) // -> obj.foo.bar.baz = 123
 */
export function createSetter(path) {
  if (!path || path === '.') return (o, v) => o;

  let fn = setterCache.get(path);
  if (fn) return fn;

  const parts = path.split('.').map(p => p.trim()).filter(Boolean);
  const tail = parts.pop();
  const chain = parts.map(p => `?.[${JSON.stringify(p)}]`).join('');

  fn = new Function('obj', 'value', `
    if (obj${chain}) {
      obj${chain}[${JSON.stringify(tail)}] = value;
    }
  `);

  setterCache.set(path, fn);
  return fn;
}
