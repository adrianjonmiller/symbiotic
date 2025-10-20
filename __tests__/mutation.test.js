import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createMutator } from '../src/mutation/createMutator.js';
import { parseExpression } from '../src/mutation/parseExpression.js';
import { bind, bindAll } from '../src/mutation/bind.js';
import { getHandler } from '../src/mutation/getHandler.js';

describe('Mutation System', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
  });

  describe('createMutator', () => {
    it('should create a mutator for basic properties', async () => {
      const element = document.createElement('div');
      const mutator = createMutator(element, 'textContent');
      
      mutator('Hello World');
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.textContent).toBe('Hello World');
    });

    it('should handle special handlers', async () => {
      const element = document.createElement('input');
      const handler = getHandler('disabled');
      const mutator = createMutator(element, 'disabled', undefined, null, handler);
      
      mutator(true);
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.disabled).toBe(true);
      expect(element.hasAttribute('disabled')).toBe(true);
      
      mutator(false);
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.disabled).toBe(false);
      expect(element.hasAttribute('disabled')).toBe(false);
    });

    it('should handle class special handler', async () => {
      const element = document.createElement('div');
      const handler = getHandler('class');
      const mutator = createMutator(element, 'class', undefined, null, handler);
      
      mutator('active primary');
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.className).toBe('active primary');
    });

    it('should handle style special handler', async () => {
      const element = document.createElement('div');
      const handler = getHandler('style');
      const mutator = createMutator(element, 'style', undefined, null, handler);
      
      mutator('color: red; font-weight: bold;');
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.style.cssText).toBe('color: red; font-weight: bold;');
    });

    it('add data attribute to element', async () => {
      const element = document.createElement('div');
      const mutator = createMutator(element, 'data-test', 'test');
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.getAttribute('data-test')).toBe('test');
    });
  });

  describe('parseExpression', () => {
    it('should handle simple paths', () => {
      const data = { name: 'John' };
      const dataFn = parseExpression('name', data);
      expect(dataFn(data)).toBe('John');
    });

    it('should handle nested paths', () => {
      const data = { user: { name: 'Jane' } };
      const dataFn = parseExpression('user.name', data);
      expect(dataFn(data)).toBe('Jane');
    });

    it('should handle complex expressions', () => {
      const data = { name: 'John', age: 30 };
      const dataFn = parseExpression('name + " is " + age + " years old"', data);
      expect(dataFn(data)).toBe('John is 30 years old');
    });

    it('should handle conditional expressions', () => {
      const data = { items: [{ name: 'First Item' }] };
      const dataFn = parseExpression('items.length > 0 ? items[0].name : "No items"', data);
      expect(dataFn(data)).toBe('First Item');
      
      const emptyData = { items: [] };
      expect(dataFn(emptyData)).toBe('No items');
    });

    it('should handle boolean expressions', () => {
      const data = { isActive: true, isEnabled: true };
      const dataFn = parseExpression('isActive && isEnabled', data);
      expect(dataFn(data)).toBe(true);
      
      const falseData = { isActive: false, isEnabled: true };
      expect(dataFn(falseData)).toBe(false);
    });

    it('should handle dot notation', () => {
      const data = { name: 'John' };
      const dataFn = parseExpression('.', data);
      expect(dataFn(data)).toBe(data);
    });

    it('should cache expressions', () => {
      const data = { name: 'John', age: 30 };
      const expr = 'name + age';
      const fn1 = parseExpression(expr, data);
      const fn2 = parseExpression(expr, data);
      expect(fn1).toBe(fn2); // Same function reference
    });

    it('should reject unsafe expressions', () => {
      const data = {};
      expect(() => parseExpression('eval("alert(1)")', data)).toThrow('Potentially dangerous expression');
      expect(() => parseExpression('Function("return alert(1)")()', data)).toThrow('Potentially dangerous expression');
      expect(() => parseExpression('setTimeout(() => alert(1), 0)', data)).toThrow('Potentially dangerous expression');
      expect(() => parseExpression('document.body.innerHTML = "hacked"', data)).toThrow('Potentially dangerous expression');
      expect(() => parseExpression('window.location = "http://evil.com"', data)).toThrow('Potentially dangerous expression');
      expect(() => parseExpression('__proto__', data)).toThrow('Potentially dangerous expression');
      expect(() => parseExpression('constructor', data)).toThrow('Potentially dangerous expression');
    });

    it('should reject expressions with unsafe characters', () => {
      const data = {};
      expect(() => parseExpression('name; alert(1)', data)).toThrow('Unsafe expression');
      expect(() => parseExpression('name\\n', data)).toThrow('Unsafe expression');
    });

    it('should allow template literals', () => {
      const data = { name: 'John', age: 30 };
      const dataFn = parseExpression('`${name} is ${age} years old`', data);
      expect(dataFn(data)).toBe('John is 30 years old');
    });

    it('should auto-prefix implicit scope expressions', () => {
      const data = { name: 'John' };
      const dataFn = parseExpression('name', data);
      expect(dataFn(data)).toBe('John');
    });

    it('should auto-prefix complex expressions', () => {
      const data = { name: 'John', age: 30 };
      const dataFn = parseExpression('name + " is " + age + " years old"', data);
      expect(dataFn(data)).toBe('John is 30 years old');
    });

    it('should auto-prefix conditional expressions', () => {
      const data = { items: [{ name: 'First Item' }] };
      const dataFn = parseExpression('items.length > 0 ? items[0].name : "No items"', data);
      expect(dataFn(data)).toBe('First Item');
    });

    it('should not double-prefix explicit $scope expressions', () => {
      const data = { name: 'John' };
      const dataFn = parseExpression('$scope.name', data);
      expect(dataFn(data)).toBe('John');
    });

    it('should handle empty expression', () => {
      const data = { name: 'John' };
      const dataFn = parseExpression('', data);
      expect(dataFn(data)).toBe(data);
    });
  });

  describe('bind function', () => {
    it('should bind simple data to element', async () => {
      const element = document.createElement('div');
      element.setAttribute('data-bind:textcontent', '$scope.name');
      container.appendChild(element);
      
      const data = { name: 'John Doe' };
      const update = bind(element, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.textContent).toBe('John Doe');
      
      // Test update
      update({ name: 'Jane Doe' });
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.textContent).toBe('Jane Doe');
    });

    it('should bind nested data', async () => {
      const element = document.createElement('div');
      element.setAttribute('data-bind:textcontent', '$scope.user.name');
      container.appendChild(element);
      
      const data = { user: { name: 'John Smith' } };
      const update = bind(element, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.textContent).toBe('John Smith');
    });

    it('should bind complex expressions', async () => {
      const element = document.createElement('div');
      element.setAttribute('data-bind:textcontent', '$scope.name + " is " + $scope.age + " years old"');
      container.appendChild(element);
      
      const data = { name: 'Alice', age: 25 };
      const update = bind(element, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.textContent).toBe('Alice is 25 years old');
    });

    it('should bind multiple attributes', async () => {
      const element = document.createElement('div');
      element.setAttribute('data-bind:textcontent', '$scope.name');
      element.setAttribute('data-bind:class', '$scope.statusClass');
      element.setAttribute('data-bind:title', '$scope.user.title');
      container.appendChild(element);
      
      const data = { 
        name: 'John', 
        statusClass: 'active primary',
        user: { title: 'Software Engineer' }
      };
      const update = bind(element, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.textContent).toBe('John');
      expect(element.className).toBe('active primary');
      expect(element.title).toBe('Software Engineer');
    });

    it('should handle special handlers', async () => {
      const element = document.createElement('input');
      element.setAttribute('data-bind:disabled', '$scope.isDisabled');
      element.setAttribute('data-bind:class', '$scope.inputClass');
      container.appendChild(element);
      
      const data = { isDisabled: true, inputClass: 'form-control' };
      const update = bind(element, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.disabled).toBe(true);
      expect(element.className).toBe('form-control');
      
      // Update
      update({ isDisabled: false, inputClass: 'form-control active' });
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.disabled).toBe(false);
      expect(element.className).toBe('form-control active');
    });

    it('should handle boolean attributes', async () => {
      const element = document.createElement('input');
      element.setAttribute('data-bind:checked', '$scope.isChecked');
      element.setAttribute('data-bind:required', '$scope.isRequired');
      container.appendChild(element);
      
      const data = { isChecked: true, isRequired: true };
      const update = bind(element, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.checked).toBe(true);
      expect(element.hasAttribute('required')).toBe(true);
    });

    it('should handle numeric attributes', async () => {
      const element = document.createElement('input');
      element.setAttribute('data-bind:maxlength', '$scope.maxLength');
      element.setAttribute('data-bind:tabindex', '$scope.tabIndex');
      container.appendChild(element);
      
      const data = { maxLength: 50, tabIndex: 1 };
      const update = bind(element, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.getAttribute('maxlength')).toBe('50');
      expect(element.getAttribute('tabindex')).toBe('1');
    });
  });

  describe('bindAll function', () => {
    it('should traverse child elements', async () => {
      const parent = document.createElement('div');
      const child1 = document.createElement('span');
      const child2 = document.createElement('div');
      
      child1.setAttribute('data-bind:textcontent', '$scope.firstName');
      child2.setAttribute('data-bind:textcontent', '$scope.lastName');
      
      parent.appendChild(child1);
      parent.appendChild(child2);
      container.appendChild(parent);
      
      const data = { firstName: 'John', lastName: 'Doe' };
      const update = bindAll(parent, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(child1.textContent).toBe('John');
      expect(child2.textContent).toBe('Doe');
    });

    it('should handle nested elements', async () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      const grandchild = document.createElement('span');
      
      child.setAttribute('data-bind:class', '$scope.childClass');
      grandchild.setAttribute('data-bind:textcontent', '$scope.grandchildText');
      
      child.appendChild(grandchild);
      parent.appendChild(child);
      container.appendChild(parent);
      
      const data = { childClass: 'child-class', grandchildText: 'Grandchild Text' };
      const update = bindAll(parent, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(child.className).toBe('child-class');
      expect(grandchild.textContent).toBe('Grandchild Text');
    });
  });

  describe('Edge cases', () => {
    it('should handle null/undefined values', async () => {
      const element = document.createElement('div');
      element.setAttribute('data-bind:textcontent', '$scope.name');
      container.appendChild(element);
      
      const data = { name: null };
      const update = bind(element, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.textContent).toBe('');
    });

    it('should handle missing properties', async () => {
      const element = document.createElement('div');
      element.setAttribute('data-bind:textcontent', '$scope.missingProperty');
      container.appendChild(element);
      
      const data = { name: 'John' };
      const update = bind(element, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.textContent).toBe('');
    });

    it('should handle empty data object', async () => {
      const element = document.createElement('div');
      element.setAttribute('data-bind:textcontent', '$scope.name');
      container.appendChild(element);
      
      const data = {};
      const update = bind(element, data);
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.textContent).toBe('');
    });

    it('should handle element with no data-bind attributes', async () => {
      const element = document.createElement('div');
      element.setAttribute('id', 'test');
      container.appendChild(element);
      
      const data = { name: 'John' };
      const update = bind(element, data);
      
      // Should not throw and should complete successfully
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(element.id).toBe('test');
    });
  });
});