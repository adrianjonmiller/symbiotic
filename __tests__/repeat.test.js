import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { repeat } from '../src/mutation/repeat.js';

describe('Repeat System', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Basic Repeat Functionality', () => {
    it('should render items from template', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="item of items">
          <div class="item" data-bind:innerHTML="item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(2);
      expect(renderedItems[0].textContent).toBe('Item 1');
      expect(renderedItems[1].textContent).toBe('Item 2');
    });

    it('should handle empty array', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="item of items">
          <div class="item" data-bind:innerHTML="item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = { items: [] };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(0);
    });

    it('should handle missing collection', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="item of items">
          <div class="item" data-bind:innerHTML="item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {};
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(0);
    });
  });

  describe('Repeat Updates', () => {
    it('should update existing items', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="item of items">
          <div class="item" data-bind:innerHTML="item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Update data
      update({
        items: [
          { id: 1, name: 'Updated Item 1' },
          { id: 2, name: 'Updated Item 2' }
        ]
      });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(2);
      expect(renderedItems[0].textContent).toBe('Updated Item 1');
      expect(renderedItems[1].textContent).toBe('Updated Item 2');
    });

    it('should add new items', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="item of items">
          <div class="item" data-bind:innerHTML="item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: [
          { id: 1, name: 'Item 1' }
        ]
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Add new item
      update({
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(2);
      expect(renderedItems[0].textContent).toBe('Item 1');
      expect(renderedItems[1].textContent).toBe('Item 2');
    });

    it('should remove items', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="item of items">
          <div class="item" data-bind:innerHTML="item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Remove one item
      update({
        items: [
          { id: 1, name: 'Item 1' }
        ]
      });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(1);
      expect(renderedItems[0].textContent).toBe('Item 1');
    });

    it('should handle reordered items', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="item of items">
          <div class="item" data-bind:innerHTML="item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' }
        ]
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Reorder items
      update({
        items: [
          { id: 3, name: 'Item 3' },
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(3);
      expect(renderedItems[0].textContent).toBe('Item 3');
      expect(renderedItems[1].textContent).toBe('Item 1');
      expect(renderedItems[2].textContent).toBe('Item 2');
    });
  });

  describe('Object Iteration', () => {
    it('should iterate over object keys', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="key of Object.keys(users)">
          <div class="user" data-bind:innerHTML="users[key].name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        users: {
          user1: { name: 'John Doe' },
          user2: { name: 'Jane Smith' },
          user3: { name: 'Bob Wilson' }
        }
      };
      
      const update = repeat(template, data, { Object });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedUsers = element.querySelectorAll('.user');
      expect(renderedUsers).toHaveLength(3);
      
      // Check that all users are rendered (order may vary)
      const userNames = Array.from(renderedUsers).map(el => el.textContent);
      expect(userNames).toContain('John Doe');
      expect(userNames).toContain('Jane Smith');
      expect(userNames).toContain('Bob Wilson');
    });

    it('should handle object key updates', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="key of Object.keys(users)">
          <div class="user" data-bind:innerHTML="users[key].name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        users: {
          user1: { name: 'John Doe' },
          user2: { name: 'Jane Smith' }
        }
      };
      
      const update = repeat(template, data, { Object });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Update with new object
      update({
        users: {
          user1: { name: 'John Updated' },
          user3: { name: 'New User' }
        }
      });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedUsers = element.querySelectorAll('.user');
      expect(renderedUsers).toHaveLength(2);
      
      const userNames = Array.from(renderedUsers).map(el => el.textContent);
      expect(userNames).toContain('John Updated');
      expect(userNames).toContain('New User');
    });

    it('should handle empty object', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="key of Object.keys(users)">
          <div class="user" data-bind:innerHTML="users[key].name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = { users: {} };
      
      const update = repeat(template, data, { Object });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedUsers = element.querySelectorAll('.user');
      expect(renderedUsers).toHaveLength(0);
    });

    it('should handle object with numeric keys', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="key of Object.keys(items)">
          <div class="item" data-bind:innerHTML="items[key]"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: {
          1: 'First Item',
          2: 'Second Item',
          3: 'Third Item'
        }
      };
      
      const update = repeat(template, data, { Object });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(3);
      
      const itemTexts = Array.from(renderedItems).map(el => el.textContent);
      expect(itemTexts).toContain('First Item');
      expect(itemTexts).toContain('Second Item');
      expect(itemTexts).toContain('Third Item');
    });
  });

  describe('Destructured Syntax', () => {
    it('should handle destructured array syntax (index, item)', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="(index, item) of items">
          <div class="item" data-bind:innerHTML="index + ': ' + item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(2);
      expect(renderedItems[0].textContent).toBe('0: Item 1');
      expect(renderedItems[1].textContent).toBe('1: Item 2');
    });

    it('should handle destructured object syntax (key, value)', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="(index, entry) of Object.entries(users)">
          <div class="user" data-bind:innerHTML="entry[0] + ': ' + entry[1].name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        users: {
          user1: { name: 'John Doe' },
          user2: { name: 'Jane Smith' }
        }
      };
      
      const update = repeat(template, data, { Object });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedUsers = element.querySelectorAll('.user');
      expect(renderedUsers).toHaveLength(2);
      
      const userTexts = Array.from(renderedUsers).map(el => el.textContent);
      expect(userTexts).toContain('user1: John Doe');
      expect(userTexts).toContain('user2: Jane Smith');
    });

    it('should handle destructured updates', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="(index, item) of items">
          <div class="item" data-bind:innerHTML="index + ': ' + item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: [
          { id: 1, name: 'Item 1' }
        ]
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Update with new items
      update({
        items: [
          { id: 1, name: 'Updated Item 1' },
          { id: 2, name: 'New Item 2' }
        ]
      });
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(2);
      expect(renderedItems[0].textContent).toBe('0: Updated Item 1');
      expect(renderedItems[1].textContent).toBe('1: New Item 2');
    });
  });

  describe('In vs Of Operators', () => {
    it('should handle "of" for values', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="item of items">
          <div class="item" data-bind:innerHTML="item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: [
          { name: 'Item 1' },
          { name: 'Item 2' }
        ]
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(2);
      expect(renderedItems[0].textContent).toBe('Item 1');
      expect(renderedItems[1].textContent).toBe('Item 2');
    });

    it('should handle "in" for indices', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="index in items">
          <div class="item" data-bind:innerHTML="index + ': ' + items[index].name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: [
          { name: 'Item 1' },
          { name: 'Item 2' }
        ]
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(2);
      expect(renderedItems[0].textContent).toBe('0: Item 1');
      expect(renderedItems[1].textContent).toBe('1: Item 2');
    });

    it('should handle "in" for object keys', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="key in users">
          <div class="user" data-bind:innerHTML="key + ': ' + users[key].name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        users: {
          user1: { name: 'John Doe' },
          user2: { name: 'Jane Smith' }
        }
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedUsers = element.querySelectorAll('.user');
      expect(renderedUsers).toHaveLength(2);
      
      const userTexts = Array.from(renderedUsers).map(el => el.textContent);
      expect(userTexts).toContain('user1: John Doe');
      expect(userTexts).toContain('user2: Jane Smith');
    });

    it('should handle destructured "in" syntax', async () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <template data-repeat="(index, item) in items">
          <div class="item" data-bind:innerHTML="index + ': ' + item.name"></div>
        </template>
      `;
      container.appendChild(element);
      
      const template = element.querySelector('template');
      const data = {
        items: [
          { name: 'Item 1' },
          { name: 'Item 2' }
        ]
      };
      
      const update = repeat(template, data);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderedItems = element.querySelectorAll('.item');
      expect(renderedItems).toHaveLength(2);
      expect(renderedItems[0].textContent).toBe('0: Item 1');
      expect(renderedItems[1].textContent).toBe('1: Item 2');
    });
  });
});