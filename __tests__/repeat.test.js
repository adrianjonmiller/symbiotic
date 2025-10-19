import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { repeat } from '../src/mutation/repeat.js';

function waitRender() {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

describe('Repeat System', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render a list of items', async () => {
    const list = [1, 2, 3];
    const template = document.createElement('template');
    template.innerHTML = `<div><span>{{ $item }}</span></div>`;
    container.appendChild(template);
    repeat(template, {data: list });
    await waitRender();
    expect(container.children.length).toBe(4);
    expect(container.children[1].textContent.trim()).toBe('1');
    expect(container.children[2].textContent.trim()).toBe('2');
    expect(container.children[3].textContent.trim()).toBe('3');
  });

  it('should call onMount when the list is rendered', async () => {
    const list = [1];
    const template = document.createElement('template');
    template.innerHTML = `<div><span>{{ $item }}</span></div>`;
    container.appendChild(template);
    const mounted = vi.fn();
    repeat(template, {data: list }, mounted);
    await waitRender();
    expect(mounted).toHaveBeenCalled();
  });

  it('should update list when data changes', async () => {
    const initialList = [1, 2, 3];
    const template = document.createElement('template');
    template.innerHTML = `<div><span>{{ $item }}</span></div>`;
    container.appendChild(template);
    
    const updateFn = repeat(template, { data: initialList });
    await waitRender();
    
    // Initial state
    expect(container.children.length).toBe(4); // template + 3 items
    expect(container.children[1].textContent.trim()).toBe('1');
    expect(container.children[2].textContent.trim()).toBe('2');
    expect(container.children[3].textContent.trim()).toBe('3');
    
    // Update with new data
    const updatedList = [2, 4, 5, 6];
    updateFn(updatedList);
    await waitRender();
    
    // Should have updated content
    expect(container.children.length).toBe(5); // template + 4 items
    expect(container.children[1].textContent.trim()).toBe('2');
    expect(container.children[2].textContent.trim()).toBe('4');
    expect(container.children[3].textContent.trim()).toBe('5');
    expect(container.children[4].textContent.trim()).toBe('6');
  });

  it('should handle adding items to the list', async () => {
    const initialList = [1, 2];
    const template = document.createElement('template');
    template.innerHTML = `<div><span>{{ $item }}</span></div>`;
    container.appendChild(template);
    
    const updateFn = repeat(template, { data: initialList });
    await waitRender();
    
    expect(container.children.length).toBe(3); // template + 2 items
    
    // Add more items
    const updatedList = [1, 2, 3, 4, 5];
    updateFn(updatedList);
    await waitRender();
    
    expect(container.children.length).toBe(6); // template + 5 items
    expect(container.children[1].textContent.trim()).toBe('1');
    expect(container.children[2].textContent.trim()).toBe('2');
    expect(container.children[3].textContent.trim()).toBe('3');
    expect(container.children[4].textContent.trim()).toBe('4');
    expect(container.children[5].textContent.trim()).toBe('5');
  });

  it('should handle removing items from the list', async () => {
    const initialList = [1, 2, 3, 4, 5];
    const template = document.createElement('template');
    template.innerHTML = `<div><span>{{ $item }}</span></div>`;
    container.appendChild(template);
    
    const updateFn = repeat(template, { data: initialList });
    await waitRender();
    
    expect(container.children.length).toBe(6); // template + 5 items
    
    // Remove some items
    const updatedList = [2, 4];
    updateFn(updatedList);
    await waitRender();
    
    expect(container.children.length).toBe(3); // template + 2 items
    expect(container.children[1].textContent.trim()).toBe('2');
    expect(container.children[2].textContent.trim()).toBe('4');
  });

  it('should handle reordering items in the list', async () => {
    const initialList = [1, 2, 3];
    const template = document.createElement('template');
    template.innerHTML = `<div><span>{{ $item }}</span></div>`;
    container.appendChild(template);
    
    const updateFn = repeat(template, { data: initialList });
    await waitRender();
    
    // Initial order
    expect(container.children[1].textContent.trim()).toBe('1');
    expect(container.children[2].textContent.trim()).toBe('2');
    expect(container.children[3].textContent.trim()).toBe('3');
    
    // Reorder items
    const reorderedList = [3, 1, 2];
    updateFn(reorderedList);
    await waitRender();
    
    // Should maintain new order
    expect(container.children[1].textContent.trim()).toBe('3');
    expect(container.children[2].textContent.trim()).toBe('1');
    expect(container.children[3].textContent.trim()).toBe('2');
  });

  it('should handle objects with ID keying', async () => {
    const initialList = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ];
    const template = document.createElement('template');
    template.innerHTML = `<div><span>{{ $item.name }} (ID: {{ $item.id }})</span></div>`;
    container.appendChild(template);
    
    const updateFn = repeat(template, { 
      data: initialList,
      key: 'id' // Use id as the key
    });
    await waitRender();
    
    // Initial state
    expect(container.children.length).toBe(4); // template + 3 items
    expect(container.children[1].textContent.trim()).toBe('Alice (ID: 1)');
    expect(container.children[2].textContent.trim()).toBe('Bob (ID: 2)');
    expect(container.children[3].textContent.trim()).toBe('Charlie (ID: 3)');
    
    // Update with modified data (same IDs, different content)
    const updatedList = [
      { id: 1, name: 'Alice Updated' },
      { id: 3, name: 'Charlie Updated' },
      { id: 4, name: 'David' } // New item
    ];
    updateFn(updatedList);
    await waitRender();
    
    // Should reuse existing elements for same IDs and create new ones for new IDs
    expect(container.children.length).toBe(4); // template + 3 items
    expect(container.children[1].textContent.trim()).toBe('Alice Updated (ID: 1)');
    expect(container.children[2].textContent.trim()).toBe('Charlie Updated (ID: 3)');
    expect(container.children[3].textContent.trim()).toBe('David (ID: 4)');
  });

  it('should handle complex updates with ID keying', async () => {
    const initialList = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 }
    ];
    const template = document.createElement('template');
    template.innerHTML = `<div><span>{{ $item.name }} ({{ $item.age }})</span></div>`;
    container.appendChild(template);
    
    const updateFn = repeat(template, { 
      data: initialList,
      key: 'id'
    });
    await waitRender();
    
    // Complex update: remove Bob, add David, update Alice's age, reorder
    const updatedList = [
      { id: 4, name: 'David', age: 28 }, // New
      { id: 1, name: 'Alice', age: 26 }, // Updated age
      { id: 3, name: 'Charlie', age: 35 } // Same
    ];
    updateFn(updatedList);
    await waitRender();
    
    expect(container.children.length).toBe(4); // template + 3 items
    expect(container.children[1].textContent.trim()).toBe('David (28)');
    expect(container.children[2].textContent.trim()).toBe('Alice (26)');
    expect(container.children[3].textContent.trim()).toBe('Charlie (35)');
  });

  it('should handle empty list updates', async () => {
    const initialList = [1, 2, 3];
    const template = document.createElement('template');
    template.innerHTML = `<div><span>{{ $item }}</span></div>`;
    container.appendChild(template);
    
    const updateFn = repeat(template, { data: initialList });
    await waitRender();
    
    expect(container.children.length).toBe(4); // template + 3 items
    
    // Clear the list
    updateFn([]);
    await waitRender();
    
    expect(container.children.length).toBe(1); // Only template remains
  });

  it('should call onMount for new items during updates', async () => {
    const initialList = [1, 2];
    const template = document.createElement('template');
    template.innerHTML = `<div><span>{{ $item }}</span></div>`;
    container.appendChild(template);
    
    const mounted = vi.fn();
    const updateFn = repeat(template, { data: initialList }, mounted);
    await waitRender();
    
    // onMount should have been called for initial items
    expect(mounted).toHaveBeenCalledTimes(2);
    
    // Add new items
    const updatedList = [1, 2, 3, 4];
    updateFn(updatedList);
    await waitRender();
    
    // onMount should have been called for the 2 new items
    expect(mounted).toHaveBeenCalledTimes(4);
  });

  it('should handle text interpolation with multiple expressions', async () => {
    const list = [
      { name: 'Alice', count: 5 },
      { name: 'Bob', count: 3 }
    ];
    const template = document.createElement('template');
    template.innerHTML = `<div>Hello {{ $item.name }}, you have {{ $item.count }} items</div>`;
    container.appendChild(template);
    
    const updateFn = repeat(template, { data: list, key: 'name' });
    await waitRender();
    
    // Check initial rendering
    expect(container.children.length).toBe(3); // template + 2 items
    expect(container.children[1].textContent.trim()).toBe('Hello Alice, you have 5 items');
    expect(container.children[2].textContent.trim()).toBe('Hello Bob, you have 3 items');
    
    // Update the data
    const updatedList = [
      { name: 'Alice', count: 10 },
      { name: 'Charlie', count: 7 }
    ];
    updateFn(updatedList);
    await waitRender();
    
    // Check updated rendering
    expect(container.children.length).toBe(3); // template + 2 items
    expect(container.children[1].textContent.trim()).toBe('Hello Alice, you have 10 items');
    expect(container.children[2].textContent.trim()).toBe('Hello Charlie, you have 7 items');
  });

  it('should handle mixed content with child elements and text interpolation', async () => {
    const list = [
      { name: 'Alice', insult: 'amazing' },
      { name: 'Bob', insult: 'wonderful' }
    ];
    const template = document.createElement('template');
    template.innerHTML = `<div>hello {{ $item.name }} <span>you are </span> {{ $item.insult }}</div>`;
    container.appendChild(template);
    
    const updateFn = repeat(template, { data: list, key: 'name' });
    await waitRender();
    
    // Check initial rendering - the span should be preserved
    expect(container.children.length).toBe(3); // template + 2 items
    const firstItem = container.children[1];
    expect(firstItem.children.length).toBe(1); // Should have the span
    expect(firstItem.children[0].tagName).toBe('SPAN');
    expect(firstItem.children[0].textContent).toBe('you are ');
    expect(firstItem.textContent.trim()).toBe('hello Alice you are  amazing');
    
    // Update the data
    const updatedList = [
      { name: 'Alice', insult: 'fantastic' },
      { name: 'Charlie', insult: 'brilliant' }
    ];
    updateFn(updatedList);
    await waitRender();
    
    // Check updated rendering - span should still be preserved
    expect(container.children.length).toBe(3); // template + 2 items
    const updatedFirstItem = container.children[1];
    expect(updatedFirstItem.children.length).toBe(1); // Should still have the span
    expect(updatedFirstItem.children[0].tagName).toBe('SPAN');
    expect(updatedFirstItem.children[0].textContent).toBe('you are ');
    expect(updatedFirstItem.textContent.trim()).toBe('hello Alice you are  fantastic');
  });

  it('should work with bind function and data-repeat attribute', async () => {
    const { bind } = await import('../src/mutation/bind.js');
    
    const template = document.createElement('template');
    template.innerHTML = `<div>{{ $item }}</div>`;
    template.setAttribute('data-repeat', '$scope.items');
    container.appendChild(template);
    
    const data = { items: [1, 2, 3] };
    const updateFn = bind(template, data);
    await waitRender();
    
    // Check initial rendering
    expect(container.children.length).toBe(4); // template + 3 items
    expect(container.children[1].textContent.trim()).toBe('1');
    expect(container.children[2].textContent.trim()).toBe('2');
    expect(container.children[3].textContent.trim()).toBe('3');
    
    // Update the data
    const newData = { items: [4, 5, 6, 7] };
    updateFn(newData);
    await waitRender();
    
    // Check updated rendering
    expect(container.children.length).toBe(5); // template + 4 items
    expect(container.children[1].textContent.trim()).toBe('4');
    expect(container.children[2].textContent.trim()).toBe('5');
    expect(container.children[3].textContent.trim()).toBe('6');
    expect(container.children[4].textContent.trim()).toBe('7');
  });

  it('should work with bind function and complex data-repeat syntax', async () => {
    const { bind } = await import('../src/mutation/bind.js');
    
    const template = document.createElement('template');
    template.innerHTML = `<div>{{ $item.name }} ({{ $item.age }})</div>`;
    template.setAttribute('data-repeat', 'item of $scope.users');
    container.appendChild(template);
    
    const data = { 
      users: [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 }
      ]
    };
    const updateFn = bind(template, data);
    await waitRender();
    
    // Check initial rendering
    expect(container.children.length).toBe(3); // template + 2 items
    expect(container.children[1].textContent.trim()).toBe('Alice (25)');
    expect(container.children[2].textContent.trim()).toBe('Bob (30)');
    
    // Update the data
    const newData = { 
      users: [
        { name: 'Alice', age: 26 },
        { name: 'Charlie', age: 35 }
      ]
    };
    updateFn(newData);
    await waitRender();
    
    // Check updated rendering
    expect(container.children.length).toBe(3); // template + 2 items
    expect(container.children[1].textContent.trim()).toBe('Alice (26)');
    expect(container.children[2].textContent.trim()).toBe('Charlie (35)');
  });
});