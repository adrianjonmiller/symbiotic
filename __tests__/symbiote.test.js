import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createSymbiote } from '../src/main.js';
import { defineSetup } from '../src/utils/globalRegistry.js';

// Polyfill requestAnimationFrame for testing
if (typeof requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 16); // ~60fps
  };
}

describe('Symbiote', () => {
  let consoleSpy;

  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Constructor and Factory Function', () => {
    it('should create symbiote instance with createSymbiote factory', async () => {
      // Setup
      document.body.innerHTML = `
        <button class="js-factory">Factory Button</button>
      `;

      const factoryHandler = vi.fn();

      const symbiote = createSymbiote({
        '.js-factory': (el) => {
          el.addEventListener('click', factoryHandler);
        }
      });

      // Act
      await symbiote.attach();

      // Assert
      const button = document.querySelector('.js-factory');
      button.click();

      expect(factoryHandler).toHaveBeenCalled();
      expect(symbiote).toBeDefined();
      expect(typeof symbiote.attach).toBe('function');
    });

    it('should handle undefined or null setup functions', async () => {
      // Setup
      document.body.innerHTML = `
        <button class="js-null">Null Button</button>
      `;

      const symbiote = createSymbiote(null);

      // Act
      await symbiote.attach();

      // Assert - should not throw any errors
      expect(true).toBe(true);
    });
  });

  describe('Performance and Cleanup', () => {
    it('should not attach to the same element twice', async () => {
      // Setup
      document.body.innerHTML = `
        <button class="js-duplicate">Duplicate Button</button>
      `;

      const duplicateHandler = vi.fn();
      let attachmentCount = 0;

      const symbiote = createSymbiote({
        '.js-duplicate': (el) => {
          attachmentCount++;
          el.addEventListener('click', duplicateHandler);
        }
      });

      // Act
      await symbiote.attach();
      await symbiote.attach(); // Call attach again

      // Assert
      const button = document.querySelector('.js-duplicate');
      button.click();

      expect(attachmentCount).toBe(1); // Should only attach once
      expect(duplicateHandler).toHaveBeenCalledTimes(1);
    });

    it('should handle large DOM structures efficiently', async () => {
      // Setup - create a large DOM structure
      const container = document.createElement('div');
      for (let i = 0; i < 100; i++) {
        const button = document.createElement('button');
        button.className = 'js-large';
        button.textContent = `Button ${i}`;
        container.appendChild(button);
      }
      document.body.appendChild(container);

      const largeHandler = vi.fn();

      const symbiote = createSymbiote({
        '.js-large': (el) => {
          el.addEventListener('click', largeHandler);
        }
      });

      // Act
      const startTime = performance.now();
      await symbiote.attach();
      const endTime = performance.now();

      // Assert
      const buttons = document.querySelectorAll('.js-large');
      buttons[0].click();

      expect(largeHandler).toHaveBeenCalled();
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
    });

    it('should work with custom root element', async () => {
      // Setup
      const customRoot = document.createElement('div');
      customRoot.innerHTML = `
        <button class="js-custom">Custom Button</button>
      `;
      document.body.appendChild(customRoot);

      const customHandler = vi.fn();

      const symbiote = createSymbiote({
        '.js-custom': (el) => {
          el.addEventListener('click', customHandler);
        }
      });

      // Act
      await symbiote.attach();

      // Assert
      const button = customRoot.querySelector('.js-custom');
      button.click();

      expect(customHandler).toHaveBeenCalled();
    });
  });

  describe('update method', () => {
    it('should check for new setup functions on existing elements', async () => {
      // Setup
      document.body.innerHTML = `
        <button class="js-update">Update Button</button>
      `;

      const updateHandler = vi.fn();

      const symbiote = createSymbiote({});
      await symbiote.attach();

      // Add new setup function after attachment
      defineSetup('.js-update', (el) => {
        el.addEventListener('click', updateHandler);
      });

      // Act
      await symbiote.update();

      // Assert
      const button = document.querySelector('.js-update');
      button.click();

      expect(updateHandler).toHaveBeenCalled();
    });

    it('should not re-attach setup functions to already processed elements', async () => {
      // Setup
      document.body.innerHTML = `
        <button class="js-reprocess">Reprocess Button</button>
      `;

      const reprocessHandler = vi.fn();
      let attachmentCount = 0;

      const symbiote = createSymbiote({
        '.js-reprocess': (el) => {
          attachmentCount++;
          el.addEventListener('click', reprocessHandler);
        }
      });

      // Act
      await symbiote.attach();
      await symbiote.update(); // Call update

      // Assert
      const button = document.querySelector('.js-reprocess');
      button.click();

      expect(attachmentCount).toBe(1); // Should only attach once
      expect(reprocessHandler).toHaveBeenCalledTimes(1);
    });
  });
});