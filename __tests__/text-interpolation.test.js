import { describe, it, expect, beforeEach } from 'vitest';
import { bind, bindAll } from '../src/mutation/bind.js';

describe('Text Interpolation', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('should interpolate simple expressions in text content', async () => {
    container.innerHTML = '<div>Hello {{ name }}!</div>';
    const element = container.querySelector('div');
    
    const update = bind(element, { name: 'World' });
    
    expect(element.textContent.trim()).toBe('Hello World!');
    
    update({ name: 'Universe' });
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent.trim()).toBe('Hello Universe!');
  });

  it('should interpolate multiple expressions in text content', async () => {
    container.innerHTML = '<div>{{ greeting }}, {{ name }}! You are {{ age }} years old.</div>';
    const element = container.querySelector('div');
    
    const update = bind(element, { 
      greeting: 'Hello', 
      name: 'John', 
      age: 25 
    });
    
    expect(element.textContent.trim()).toBe('Hello, John! You are 25 years old.');
    
    update({ 
      greeting: 'Hi', 
      name: 'Jane', 
      age: 30 
    });
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent.trim()).toBe('Hi, Jane! You are 30 years old.');
  });

  it('should handle complex expressions in interpolation', () => {
    container.innerHTML = '<div>{{ user.name }} has {{ user.items.length }} items. Total: ${{ user.items.reduce((sum, item) => sum + item.price, 0) }}</div>';
    const element = container.querySelector('div');
    
    const update = bind(element, {
      user: {
        name: 'Alice',
        items: [
          { name: 'Book', price: 10 },
          { name: 'Pen', price: 2 }
        ]
      }
    });
    
    expect(element.textContent.trim()).toBe('Alice has 2 items. Total: $12');
  });

  it('should handle conditional expressions in interpolation', async () => {
    container.innerHTML = '<div>{{ isLoggedIn ? "Welcome back, " + user.name : "Please log in" }}</div>';
    const element = container.querySelector('div');
    
    const update = bind(element, {
      isLoggedIn: true,
      user: { name: 'Bob' }
    });
    
    expect(element.textContent.trim()).toBe('Welcome back, Bob');
    
    update({ isLoggedIn: false, user: { name: 'Bob' } });
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent.trim()).toBe('Please log in');
  });

  it('should handle mixed text and expressions', () => {
    container.innerHTML = '<div>Status: {{ status ? "Online" : "Offline" }} ({{ count }} users)</div>';
    const element = container.querySelector('div');
    
    const update = bind(element, {
      status: true,
      count: 42
    });
    
    expect(element.textContent.trim()).toBe('Status: Online (42 users)');
  });

  it('should work with nested elements', () => {
    container.innerHTML = `
      <div>
        <h1>{{ title }}</h1>
        <p>By {{ author.name }}</p>
        <span>{{ date.toLocaleDateString() }}</span>
      </div>
    `;
    
    const update = bindAll(container, {
      title: 'My Article',
      author: { name: 'John Doe' },
      date: new Date(2023, 0, 1) // January 1, 2023
    });
    
    expect(container.querySelector('h1').textContent.trim()).toBe('My Article');
    expect(container.querySelector('p').textContent.trim()).toBe('By John Doe');
    expect(container.querySelector('span').textContent.trim()).toBe('1/1/2023');
  });

  it('should handle empty or null values gracefully', async () => {
    container.innerHTML = '<div>Hello {{ name || "Guest" }}!</div>';
    const element = container.querySelector('div');
    
    const update = bind(element, { name: null });
    expect(element.textContent.trim()).toBe('Hello Guest!');
    
    update({ name: '' });
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent.trim()).toBe('Hello Guest!');
    
    update({ name: 'Alice' });
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(element.textContent.trim()).toBe('Hello Alice!');
  });

  it('should work alongside data-bind attributes', () => {
    container.innerHTML = '<div data-bind:class="statusClass">Status: {{ status }}</div>';
    
    const update = bindAll(container, {
      status: 'Active',
      statusClass: 'active'
    });
    
    const child = container.querySelector('div');
    expect(child.textContent.trim()).toBe('Status: Active');
    expect(child.className).toBe('active');
  });
});
