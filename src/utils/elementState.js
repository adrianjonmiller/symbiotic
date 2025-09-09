/**
 * Element state management utilities
 * 
 * This module handles tracking which selectors are attached to elements
 * and managing cleanup functions for proper resource management.
 */

// Per-element attachment state (keyed by selector)
export const attachedBySelector = new WeakMap();   // Element -> Set<selectors>
export const cleanupBySelector  = new WeakMap();   // Element -> Map<selectors, fn>

// "Direct" attachments (from template render with raw setup fns, not selector-based)
export const directCleanupMap = new WeakMap();     // Element -> Set<fn>

/**
 * Get or create the set of attached selectors for an element
 */
export function getAttachedSet(el) {
  let set = attachedBySelector.get(el);
  if (!set) { set = new Set(); attachedBySelector.set(el, set); }
  return set;
}

/**
 * Get or create the cleanup map for an element
 */
export function getCleanupMap(el) {
  let map = cleanupBySelector.get(el);
  if (!map) { map = new Map(); cleanupBySelector.set(el, map); }
  return map;
}

/**
 * Add a direct cleanup function for an element
 */
export function addDirectCleanup(el, fn) {
  if (typeof fn !== 'function') return;
  let set = directCleanupMap.get(el);
  if (!set) { set = new Set(); directCleanupMap.set(el, set); }
  set.add(fn);
}

/**
 * Run all direct cleanup functions for an element
 */
export function runDirectCleanups(el) {
  const set = directCleanupMap.get(el);
  if (!set) return;
  for (const fn of set) { try { fn(); } catch (e) { console.error(e); } }
  set.clear();
  directCleanupMap.delete(el);
}
