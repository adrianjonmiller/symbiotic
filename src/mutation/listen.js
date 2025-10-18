/**
 * listen(el, type, handler, [options])
 * 
 * Adds an event listener and returns a remove() function.
 * 
 * - Works with EventTarget (Element, window, document, etc.)
 * - No teardown tracking; simple and direct.
 * - Safe if element is null or undefined.
 */
export function listen(el, type, handler, options) {
  if (!el || typeof el.addEventListener !== 'function') return () => {};

  el.addEventListener(type, handler, options);

  // Return the inverse
  return function removeListener() {
    el.removeEventListener(type, handler, options);
  };
}
