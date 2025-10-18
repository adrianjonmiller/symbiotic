const getterCache = new Map();

/**
 * createGetter(path)
 * Returns a fast compiled function for reading nested values.
 * Example: const getFoo = createGetter('foo.bar.baz')
 * getFoo(obj) -> obj?.foo?.bar?.baz
 */
export function createGetter(path) {
  if (!path || path === '.') return (o) => o;

  let fn = getterCache.get(path);
  if (fn) return fn;

  const parts = path.split('.').map(p => p.trim()).filter(Boolean);
  const chain = parts.map(p => `?.[${JSON.stringify(p)}]`).join('');
  fn = new Function('obj', `return obj${chain};`);

  getterCache.set(path, fn);
  return fn;
}
