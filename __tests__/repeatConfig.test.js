import { describe, it, expect } from 'vitest';
import { parseRepeat, isTemplate } from '../src/mutation/repeat.js';

describe('Repeat Config Generation', () => {
  it('should parse simple data reference', () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'items');
    
    const result = parseRepeat(element);
    
    expect(result).toEqual({
      itemVar: 'item',
      collection: 'items',
      keyPath: 'index',
      operator: 'of'
    });
  });

  it('should parse item of collection syntax', () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'item of users');
    
    const result = parseRepeat(element);
    
    expect(result).toEqual({
      itemVar: 'item',
      collection: 'users',
      keyPath: 'index',
      operator: 'of'
    });
  });

  it('should parse item in collection syntax', () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'item in users');
    
    const result = parseRepeat(element);
    
    expect(result).toEqual({
      itemVar: 'item',
      collection: 'users',
      keyPath: 'index',
      operator: 'of'
    });
  });

  it('should parse destructured syntax with key and item', () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', '(key, item) of users');
    
    const result = parseRepeat(element);
    
    expect(result).toEqual({
      itemVar: 'item',
      keyVar: 'key',
      collection: 'users',
      keyPath: 'key',
      operator: 'of'
    });
  });

  it('should parse destructured syntax with index and item', () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', '(index, item) in users');
    
    const result = parseRepeat(element);
    
    expect(result).toEqual({
      itemVar: 'item',
      keyVar: 'index',
      collection: 'users',
      keyPath: 'index',
      operator: 'of'
    });
  });

  it('should return null for invalid syntax', () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'invalid syntax');
    
    const result = parseRepeat(element);
    
    expect(result).toBeNull();
  });

  it('should return null for element without data-repeat', () => {
    const element = document.createElement('template');
    
    const result = parseRepeat(element);
    
    expect(result).toBeNull();
  });

  it('should parse dot syntax for collection references', () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'item of store.products');
    
    const result = parseRepeat(element);
    
    expect(result).toEqual({
      itemVar: 'item',
      collection: 'store.products',
      keyPath: 'index',
      operator: 'of'
    });
  });

  it('should parse dot syntax for simple data reference', () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'store.products');
    
    const result = parseRepeat(element);
    
    expect(result).toEqual({
      itemVar: 'item',
      collection: 'store.products',
      keyPath: 'index',
      operator: 'of'
    });
  });

  it('should parse dot syntax for destructured syntax', () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', '(key, item) of store.products');
    
    const result = parseRepeat(element);
    
    expect(result).toEqual({
      itemVar: 'item',
      keyVar: 'key',
      collection: 'store.products',
      keyPath: 'key',
      operator: 'of'
    });
  });
});

describe('Config Generation from Data', () => {
  async function createRepeatConfig(element, data, inject = {}) {
    // First check if element is a template
    if (!isTemplate(element)) return null;
    
    // Then check if it has repeat attributes
    const repeatInfo = parseRepeat(element);
    if (!repeatInfo) return null;
    
    // Use createGetter for dot syntax support
    const { createGetter } = await import('../src/mutation/createGetter.js');
    const getData = createGetter(repeatInfo.collection);
    
    return {
      data: getData(data) || [],
      key: repeatInfo.keyPath === 'index' ? null : repeatInfo.keyPath,
      itemKey: repeatInfo.itemVar,
      inject: inject
    };
  }

  it('should generate config for simple data reference', async () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'items');
    
    const data = { items: [1, 2, 3] };
    const config = await createRepeatConfig(element, data);
    
    expect(config).toEqual({
      data: [1, 2, 3],
      key: null,
      itemKey: 'item',
      inject: {}
    });
  });

  it('should generate config for item of collection', async () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'item of users');
    
    const data = { 
      users: [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 }
      ]
    };
    const config = await createRepeatConfig(element, data);
    
    expect(config).toEqual({
      data: [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 }
      ],
      key: null,
      itemKey: 'item',
      inject: {}
    });
  });

  it('should generate config for destructured syntax with key', async () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', '(key, item) of users');
    
    const data = { 
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]
    };
    const config = await createRepeatConfig(element, data);
    
    expect(config).toEqual({
      data: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ],
      key: 'key',
      itemKey: 'item',
      inject: {}
    });
  });

  it('should handle missing data gracefully', async () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'items');
    
    const data = {}; // No items property
    const config = await createRepeatConfig(element, data);
    
    expect(config).toEqual({
      data: [],
      key: null,
      itemKey: 'item',
      inject: {}
    });
  });

  it('should include inject in config', async () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'items');
    
    const data = { items: [1, 2, 3] };
    const inject = { foo: 'bar' };
    const config = await createRepeatConfig(element, data, inject);
    
    expect(config).toEqual({
      data: [1, 2, 3],
      key: null,
      itemKey: 'item',
      inject: { foo: 'bar' }
    });
  });

  it('should generate config for dot syntax data reference', async () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'store.products');
    
    const data = { 
      store: { 
        products: [
          { name: 'Product 1', price: 10 },
          { name: 'Product 2', price: 20 }
        ]
      }
    };
    const config = await createRepeatConfig(element, data);
    
    expect(config).toEqual({
      data: [
        { name: 'Product 1', price: 10 },
        { name: 'Product 2', price: 20 }
      ],
      key: null,
      itemKey: 'item',
      inject: {}
    });
  });

  it('should generate config for dot syntax with item of collection', async () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'item of store.products');
    
    const data = { 
      store: { 
        products: [
          { name: 'Product 1', price: 10 },
          { name: 'Product 2', price: 20 }
        ]
      }
    };
    const config = await createRepeatConfig(element, data);
    
    expect(config).toEqual({
      data: [
        { name: 'Product 1', price: 10 },
        { name: 'Product 2', price: 20 }
      ],
      key: null,
      itemKey: 'item',
      inject: {}
    });
  });

  it('should handle missing nested data gracefully', async () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'store.products');
    
    const data = {}; // No store property
    const config = await createRepeatConfig(element, data);
    
    expect(config).toEqual({
      data: [],
      key: null,
      itemKey: 'item',
      inject: {}
    });
  });

  it('should return null for non-template elements', async () => {
    const element = document.createElement('div');
    element.setAttribute('data-repeat', 'items');
    
    const data = { items: [1, 2, 3] };
    const config = await createRepeatConfig(element, data);
    
    expect(config).toBeNull();
  });

  it('should return null for template elements without repeat attributes', async () => {
    const element = document.createElement('template');
    // No data-repeat attribute
    
    const data = { items: [1, 2, 3] };
    const config = await createRepeatConfig(element, data);
    
    expect(config).toBeNull();
  });

  it('should return null for template elements with invalid repeat syntax', async () => {
    const element = document.createElement('template');
    element.setAttribute('data-repeat', 'invalid syntax');
    
    const data = { items: [1, 2, 3] };
    const config = await createRepeatConfig(element, data);
    
    expect(config).toBeNull();
  });

  it('should work with repeat function integration', async () => {
    const { repeat } = await import('../src/mutation/repeat.js');
    
    // Create a container and template
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    const element = document.createElement('template');
    element.innerHTML = `<div>{{ item }}</div>`;
    element.setAttribute('data-repeat', 'items');
    container.appendChild(element);
    
    const data = { items: [1, 2, 3] };
    const config = await createRepeatConfig(element, data);
    
    // Test that the config works with the repeat function
    const updateFn = repeat(element, config);
    await new Promise(resolve => requestAnimationFrame(() => resolve()));
    
    // The repeat function should have rendered the items
    expect(container.children.length).toBe(4); // template + 3 items
    
    // Cleanup
    document.body.removeChild(container);
  });

});
