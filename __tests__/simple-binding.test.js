import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMutator, batch, destroy } from '../src/mutation.js';

describe('Simple Binding', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it('should return a function that updates element properties', async () => {
    const updateText = createMutator(element, 'textContent');
    
    updateText('Hello World');
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent).toBe('Hello World');
    
    updateText('Updated');
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent).toBe('Updated');
  });

  it('should set initial value if provided', async () => {
    const updateText = createMutator(element, 'textContent', 'Initial Value');
    expect(element.textContent).toBe('Initial Value');
    
    updateText('New Value');
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent).toBe('New Value');
  });

  it('should apply transform function', async () => {
    const updateCount = createMutator(element, 'textContent', 0, (value) => `Count: ${value}`);
    expect(element.textContent).toBe('Count: 0');
    
    updateCount(5);
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent).toBe('Count: 5');
  });

  it('should handle different property types', async () => {
    const updateClass = createMutator(element, 'class');
    const updateHidden = createMutator(element, 'hidden');
    const updateTitle = createMutator(element, 'title');
    
    updateClass('active primary');
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.className).toBe('active primary');
    
    updateHidden(true);
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.hidden).toBe(true);
    
    updateTitle('Tooltip text');
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.title).toBe('Tooltip text');
  });

  it('should handle innerHTML', async () => {
    const updateHTML = createMutator(element, 'innerHTML');
    
    updateHTML('<span>Hello</span>');
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.innerHTML).toBe('<span>Hello</span>');
  });

  it('should not update if value is the same', async () => {
    const updateText = createMutator(element, 'textContent', 'Same Value');
    expect(element.textContent).toBe('Same Value');
    
    // Update with same value - should not change
    updateText('Same Value');
    expect(element.textContent).toBe('Same Value');
    
    // Update with different value - should change
    updateText('Different Value');
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent).toBe('Different Value');
  });

  it('should work with custom properties', async () => {
    const updateCustom = createMutator(element, 'data-custom');
    
    updateCustom('custom-value');
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.getAttribute('data-custom')).toBe('custom-value');
  });

  it('should handle null/undefined elements gracefully', () => {
    expect(() => createMutator(null, 'textContent')).not.toThrow();
    expect(() => createMutator(undefined, 'textContent')).not.toThrow();
    
    const result = createMutator(null, 'textContent');
    expect(result).toBeUndefined();
  });

  it('should work with state manager patterns', async () => {
    // Simulate a simple state manager
    const state = { count: 0 };
    const updateCount = createMutator(element, 'textContent', state.count, (value) => `Count: ${value}`);
    
    // Simulate state change
    state.count = 5;
    updateCount(state.count);
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent).toBe('Count: 5');
    
    // Simulate another state change
    state.count = 10;
    updateCount(state.count);
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent).toBe('Count: 10');
  });

  describe('batch function', () => {
    it('should batch DOM operations', async () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      const element3 = document.createElement('div');
      document.body.appendChild(element1);
      document.body.appendChild(element2);
      document.body.appendChild(element3);

      // Batch multiple operations
      batch(() => {
        element1.style.color = 'red';
        element2.style.fontSize = '18px';
        element3.classList.add('active');
      });

      // Wait for batch to execute
      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(element1.style.color).toBe('red');
      expect(element2.style.fontSize).toBe('18px');
      expect(element3.classList.contains('active')).toBe(true);

      // Cleanup
      document.body.removeChild(element1);
      document.body.removeChild(element2);
      document.body.removeChild(element3);
    });

    it('should return a promise', async () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const batchPromise = batch(() => {
        element.style.color = 'blue';
      });

      expect(batchPromise).toBeInstanceOf(Promise);
      
      // Wait for batch to execute
      await batchPromise;
      expect(element.style.color).toBe('blue');

      // Cleanup
      document.body.removeChild(element);
    });

    it('should batch multiple batch calls together', async () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      // Multiple batch calls should be batched together
      batch(() => element.style.color = 'red');
      batch(() => element.style.fontSize = '16px');
      batch(() => element.classList.add('test'));

      // Wait for batch to execute
      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(element.style.color).toBe('red');
      expect(element.style.fontSize).toBe('16px');
      expect(element.classList.contains('test')).toBe(true);

      // Cleanup
      document.body.removeChild(element);
    });
  });

  describe('destroy function', () => {
    it('should destroy and resurrect element', async () => {
      const element = document.createElement('div');
      element.textContent = 'Test Element';
      element.className = 'test-class';
      document.body.appendChild(element);

      // Destroy the element
      const resurrect = destroy(element);
      
      // Wait for destroy to execute
      await new Promise(resolve => requestAnimationFrame(resolve));

      // Element should be replaced with placeholder
      expect(element.parentNode).toBeNull();
      expect(document.body.querySelector('.test-class')).toBeNull();
      // Check that our specific element is not in the document
      expect(Array.from(document.body.querySelectorAll('div')).includes(element)).toBe(false);

      // Resurrect the element
      const remove = resurrect();
      
      // Wait for resurrect to execute
      await new Promise(resolve => requestAnimationFrame(resolve));

      // Element should be back
      expect(element.parentNode).toBe(document.body);
      expect(element.textContent).toBe('Test Element');
      expect(element.className).toBe('test-class');

      // Remove again
      const resurrect2 = remove();
      
      // Wait for remove to execute
      await new Promise(resolve => requestAnimationFrame(resolve));

      // Element should be gone again
      expect(element.parentNode).toBeNull();

      // Cleanup
      if (element.parentNode) {
        document.body.removeChild(element);
      }
    });

    it('should return toggle functions', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const resurrect = destroy(element);
      expect(typeof resurrect).toBe('function');

      const remove = resurrect();
      expect(typeof remove).toBe('function');

      const resurrect2 = remove();
      expect(typeof resurrect2).toBe('function');

      // Cleanup
      if (element.parentNode) {
        document.body.removeChild(element);
      }
    });

    it('should work with multiple elements', async () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      element1.textContent = 'Element 1';
      element2.textContent = 'Element 2';
      document.body.appendChild(element1);
      document.body.appendChild(element2);

      // Destroy both elements
      const resurrect1 = destroy(element1);
      const resurrect2 = destroy(element2);
      
      // Wait for destroy to execute
      await new Promise(resolve => requestAnimationFrame(resolve));

      // Both should be gone
      expect(element1.parentNode).toBeNull();
      expect(element2.parentNode).toBeNull();

      // Resurrect both
      resurrect1();
      resurrect2();
      
      // Wait for resurrect to execute
      await new Promise(resolve => requestAnimationFrame(resolve));

      // Both should be back
      expect(element1.parentNode).toBe(document.body);
      expect(element2.parentNode).toBe(document.body);
      expect(element1.textContent).toBe('Element 1');
      expect(element2.textContent).toBe('Element 2');

      // Cleanup
      document.body.removeChild(element1);
      document.body.removeChild(element2);
    });
  });
});
