const accessorCache = new Map();

/**
 * createAccessor(path)
 * 
 * Returns a dual-purpose function:
 *   accessor(obj)            -> get value
 *   accessor(obj, newValue)  -> set value
 */
export function createAccessor(path) {
  if (!path || path === '.') return (obj, v) => (v === undefined ? obj : v);

  let fn = accessorCache.get(path);
  if (fn) return fn;

  const parts = path.split('.').map((p) => p.trim()).filter(Boolean);
  const tail = parts[parts.length - 1];
  const chain = parts.map((p) => `?.[${JSON.stringify(p)}]`).join('');

  fn = new Function(
    'obj',
    'value',
    `
      if (arguments.length === 1) {
        // GET
        return obj${chain};
      } else {
        // SET
        const parts = ${JSON.stringify(parts)};
        let target = obj;
        for (let i = 0; i < parts.length - 1; i++) {
          const key = parts[i];
          if (target[key] == null) target[key] = {};
          target = target[key];
        }
        target[${JSON.stringify(tail)}] = value;
        return value;
      }
    `
  );

  accessorCache.set(path, fn);
  return fn;
}
