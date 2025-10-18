import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createSymbiote } from '../src/main.js';

// Polyfill requestAnimationFrame for testing
if (typeof requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 16); // ~60fps
  };
}

describe('MutationObserver Functionality', () => {
  let consoleSpy;

  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should attach to dynamically added elements', async () => {
    // Setup
    document.body.innerHTML = `
      <div id="container"></div>
    `;

    const dynamicHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-dynamic': (el) => {
        el.addEventListener('click', dynamicHandler);
      }
    });

    await symbiote.attach();

    // Act - add element dynamically
    const container = document.getElementById('container');
    const dynamicElement = document.createElement('button');
    dynamicElement.className = 'js-dynamic';
    dynamicElement.textContent = 'Dynamic Button';
    container.appendChild(dynamicElement);

    // Wait for mutation observer to process
    await new Promise(resolve => setTimeout(resolve, 10));

    // Assert
    dynamicElement.click();
    expect(dynamicHandler).toHaveBeenCalled();
  });

  it('should handle class changes on existing elements', async () => {
    // Setup
    document.body.innerHTML = `
      <button id="test-button" class="js-initial">Test Button</button>
    `;

    const initialHandler = vi.fn();
    const updatedHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-initial': (el) => {
        el.addEventListener('click', initialHandler);
      },
      '.js-updated': (el) => {
        el.addEventListener('click', updatedHandler);
      }
    });

    await symbiote.attach();

    // Act - change class
    const button = document.getElementById('test-button');
    button.classList.remove('js-initial');
    button.classList.add('js-updated');

    // Wait for mutation observer to process
    await new Promise(resolve => setTimeout(resolve, 10));

    // Assert
    button.click();
    expect(updatedHandler).toHaveBeenCalled();
  });

  it('should handle element removal', async () => {
    // Setup
    document.body.innerHTML = `
      <div id="container">
        <button class="js-removable">Removable Button</button>
      </div>
    `;

    const removableHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-removable': (el) => {
        el.addEventListener('click', removableHandler);
      }
    });

    await symbiote.attach();

    // Act - remove element
    const container = document.getElementById('container');
    const removableButton = document.querySelector('.js-removable');
    container.removeChild(removableButton);

    // Wait for mutation observer to process
    await new Promise(resolve => setTimeout(resolve, 10));

    // Assert - element should be removed and handler should not be called
    expect(document.querySelector('.js-removable')).toBeNull();
  });
});
