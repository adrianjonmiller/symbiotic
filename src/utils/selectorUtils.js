/**
 * Selector indexing and matching utilities
 * 
 * This module handles the efficient indexing and matching of CSS selectors
 * to optimize DOM element selection and attachment.
 */

// Lightweight selector index
export const selectorIndex = {
  id: new Map(),     // id -> Set<selectors starting with #id>
  class: new Map(),  // class -> Set<selectors starting with .class>
  tag: new Map(),    // tagName(lower) or '*' -> Set<selectors>
  other: new Set(),  // Set<selectors>
};

/**
 * Check if a selector is stable (not a pseudo-selector)
 * Pseudo-selectors are dynamic and unreliable for DOM attachment
 */
export function isStableSelector(selector) {
  // Exclude all pseudo-selectors as they are dynamic and unreliable for DOM attachment
  return !/:[a-zA-Z-]/.test(selector);
}

/**
 * Index a selector for efficient lookup
 */
export function indexSelector(selector) {
  const s = selector.trim();
  // id bucket
  if (s.startsWith('#')) {
    const id = s.slice(1).split(/[^-_a-zA-Z0-9]/, 1)[0];
    if (!selectorIndex.id.has(id)) selectorIndex.id.set(id, new Set());
    selectorIndex.id.get(id).add(s);
    return;
  }
  // class bucket - handle both simple and complex selectors
  if (s.includes('.')) {
    // Extract all class names from the selector
    const classMatches = s.match(/\.[a-zA-Z0-9_-]+/g);
    if (classMatches) {
      for (const classMatch of classMatches) {
        const cls = classMatch.slice(1); // Remove the dot
        if (!selectorIndex.class.has(cls)) selectorIndex.class.set(cls, new Set());
        selectorIndex.class.get(cls).add(s);
      }
      return;
    }
  }
  // tag or * - handle attribute selectors like button[disabled]
  const first = s.split(/[\s.#[:]/, 1)[0].toLowerCase();
  if (first && (/^[a-z][a-z0-9-]*$/.test(first) || first === '*')) {
    if (!selectorIndex.tag.has(first)) selectorIndex.tag.set(first, new Set());
    selectorIndex.tag.get(first).add(s);
    return;
  }
  // attribute selectors like [data-required="true"] - index by tag if present
  if (s.startsWith('[')) {
    // Try to extract tag name from attribute selectors like button[disabled]
    const tagMatch = s.match(/^([a-z][a-z0-9-]*)\[/);
    if (tagMatch) {
      const tag = tagMatch[1];
      if (!selectorIndex.tag.has(tag)) selectorIndex.tag.set(tag, new Set());
      selectorIndex.tag.get(tag).add(s);
      return;
    }
  }
  selectorIndex.other.add(s);
}

/**
 * Remove a selector from the index
 */
export function deindexSelector(selector) {
  const s = selector.trim();
  let removed = false;
  if (s.startsWith('#')) {
    const id = s.slice(1).split(/[^-_a-zA-Z0-9]/, 1)[0];
    const set = selectorIndex.id.get(id);
    if (set) { set.delete(s); if (!set.size) selectorIndex.id.delete(id); removed = true; }
  } else if (s.includes('.')) {
    // Extract all class names from the selector
    const classMatches = s.match(/\.[a-zA-Z0-9_-]+/g);
    if (classMatches) {
      for (const classMatch of classMatches) {
        const cls = classMatch.slice(1); // Remove the dot
        const set = selectorIndex.class.get(cls);
        if (set) { set.delete(s); if (!set.size) selectorIndex.class.delete(cls); removed = true; }
      }
    }
  } else {
    const first = s.split(/[\s.#[:]/, 1)[0].toLowerCase();
    if (first && (/^[a-z][a-z0-9-]*$/.test(first) || first === '*')) {
      const set = selectorIndex.tag.get(first);
      if (set) { set.delete(s); if (!set.size) selectorIndex.tag.delete(first); removed = true; }
    }
  }
  // Handle attribute selectors like [data-required="true"]
  if (!removed && s.startsWith('[')) {
    const tagMatch = s.match(/^([a-z][a-z0-9-]*)\[/);
    if (tagMatch) {
      const tag = tagMatch[1];
      const set = selectorIndex.tag.get(tag);
      if (set) { set.delete(s); if (!set.size) selectorIndex.tag.delete(tag); removed = true; }
    }
  }
  if (!removed) selectorIndex.other.delete(s);
}

/**
 * Generator function that yields candidate selectors for an element
 * This efficiently finds likely selectors before calling el.matches()
 */
export function* candidateSelectorsFor(el) {
  // Build a small set of likely selectors before calling el.matches()
  const out = new Set();

  const id = el.id?.trim();
  if (id && selectorIndex.id.has(id)) {
    for (const s of selectorIndex.id.get(id)) out.add(s);
  }

  if (el.classList && el.classList.length) {
    for (const cls of el.classList) {
      const set = selectorIndex.class.get(cls);
      if (set) for (const s of set) out.add(s);
    }
  }

  const tag = el.tagName?.toLowerCase();
  if (tag) {
    const tset = selectorIndex.tag.get(tag);
    if (tset) for (const s of tset) out.add(s);
    const allset = selectorIndex.tag.get('*');
    if (allset) for (const s of allset) out.add(s);
  }

  // Always include complex selectors
  for (const s of selectorIndex.other) out.add(s);

  yield* out;
}
