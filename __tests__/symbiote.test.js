import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createSymbiote, defineSetup } from '../src/Symbiote.js';

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

  describe('Basic Functionality', () => {
    it('should attach nodule functions to matching elements', async () => {
      // Setup
      document.body.innerHTML = `
        <button class="js-button">Click me</button>
        <div class="js-modal">Modal content</div>
      `;

      const buttonClickHandler = vi.fn();
      const modalClickHandler = vi.fn();

      const symbiote = createSymbiote({
        'js-button': (el) => {
          el.addEventListener('click', buttonClickHandler);
        },
        'js-modal': (el) => {
          el.addEventListener('click', modalClickHandler);
        }
      });

      // Act
      await symbiote.attach();

      // Assert
      const button = document.querySelector('.js-button');
      const modal = document.querySelector('.js-modal');

      button.click();
      modal.click();

      expect(buttonClickHandler).toHaveBeenCalled();
      expect(modalClickHandler).toHaveBeenCalled();
    });

    it('should handle multiple classes on the same element', async () => {
      // Setup
      document.body.innerHTML = `
        <button class="js-button primary">Click me</button>
      `;

      const buttonHandler = vi.fn();
      const primaryHandler = vi.fn();

      const symbiote = createSymbiote({
        'js-button': (el) => {
          el.addEventListener('click', buttonHandler);
        },
        'primary': (el) => {
          el.addEventListener('click', primaryHandler);
        }
      });

      // Act
      await symbiote.attach();

      // Assert
      const button = document.querySelector('.js-button');
      button.click();

      expect(buttonHandler).toHaveBeenCalled();
      expect(primaryHandler).toHaveBeenCalled();
    });

    it('should traverse nested elements with tree walker', async () => {
      // Setup
      document.body.innerHTML = `
        <div class="container">
          <div class="nested">
            <button class="js-button">Nested button</button>
          </div>
        </div>
      `;

      const nestedButtonHandler = vi.fn();

      const symbiote = createSymbiote({
        'js-button': (el) => {
          el.addEventListener('click', nestedButtonHandler);
        }
      });

      // Act
      await symbiote.attach();

      // Assert
      const nestedButton = document.querySelector('.js-button');
      nestedButton.click();

      expect(nestedButtonHandler).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty nodules object', async () => {
      // Setup
      document.body.innerHTML = `<button class="js-button">Click me</button>`;

      const symbiote = createSymbiote({});

      // Act & Assert - should not throw
      await expect(symbiote.attach()).resolves.not.toThrow();
    });

    it('should handle elements with no classes', async () => {
      // Setup
      document.body.innerHTML = `<div>No classes</div>`;

      const symbiote = createSymbiote({
        'some-class': (el) => {
          el.dataset.attached = 'true';
        }
      });

      // Act
      await symbiote.attach();

      // Assert
      const div = document.querySelector('div');
      expect(div.dataset.attached).toBeUndefined();
    });

    it('should handle non-HTML elements', async () => {
      // Setup
      document.body.innerHTML = `
        <div>
          <span>Text node</span>
          <script>console.log('script')</script>
        </div>
      `;

      const symbiote = createSymbiote({
        'js-element': (el) => {
          el.dataset.attached = 'true';
        }
      });

      // Act
      await symbiote.attach();

      // Assert - should not throw and should not attach to non-HTML elements
      await expect(symbiote.attach()).resolves.not.toThrow();
    });

    it('should not attach to elements without matching classes', async () => {
      // Setup
      document.body.innerHTML = `
        <button class="other-class">Button</button>
        <div class="js-modal">Modal</div>
      `;

      const modalHandler = vi.fn();

      const symbiote = createSymbiote({
        'js-modal': (el) => {
          el.addEventListener('click', modalHandler);
        }
      });

      // Act
      await symbiote.attach();

      // Assert
      const button = document.querySelector('.other-class');
      const modal = document.querySelector('.js-modal');

      button.click();
      modal.click();

      expect(modalHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Handling', () => {
    it('should catch and log errors in nodule functions', async () => {
      // Setup
      document.body.innerHTML = `<button class="js-error">Error button</button>`;

      const symbiote = createSymbiote({
        'js-error': (el) => {
          throw new Error('Test error');
        }
      });

      // Act
      await symbiote.attach();

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Error attaching module:', expect.any(Error));
    });

    it('should continue processing other elements after an error', async () => {
      // Setup
      document.body.innerHTML = `
        <button class="js-error">Error button</button>
        <button class="js-success">Success button</button>
      `;

      const successHandler = vi.fn();

      const symbiote = createSymbiote({
        'js-error': (el) => {
          throw new Error('Test error');
        },
        'js-success': (el) => {
          el.addEventListener('click', successHandler);
        }
      });

      // Act
      await symbiote.attach();

      // Assert
      const successButton = document.querySelector('.js-success');
      successButton.click();

      expect(consoleSpy).toHaveBeenCalledWith('Error attaching module:', expect.any(Error));
      expect(successHandler).toHaveBeenCalled();
    });
  });

  describe('MutationObserver Functionality', () => {
    it('should attach to dynamically added elements', async () => {
      // Setup
      const symbiote = createSymbiote({
        'js-dynamic': (el) => {
          el.dataset.attached = 'true';
        }
      });

      await symbiote.attach();

      // Act - add element after attachment
      const newElement = document.createElement('div');
      newElement.className = 'js-dynamic';
      document.body.appendChild(newElement);

      // Wait for MutationObserver
      await new Promise(resolve => setTimeout(resolve, 0));

      // Assert
      expect(newElement.dataset.attached).toBe('true');
    });

    it('should handle class changes on existing elements', async () => {
      // Setup
      document.body.innerHTML = `<div class="original">Original</div>`;

      const symbiote = createSymbiote({
        'js-new-class': (el) => {
          el.dataset.attached = 'true';
        }
      });

      await symbiote.attach();

      // Act - change class
      const div = document.querySelector('.original');
      div.classList.add('js-new-class');

      // Wait for MutationObserver
      await new Promise(resolve => setTimeout(resolve, 0));

      // Assert
      expect(div.dataset.attached).toBe('true');
    });

    it('should handle element removal', async () => {
      // Setup
      document.body.innerHTML = `<div class="js-removable">Removable</div>`;

      const symbiote = createSymbiote({
        'js-removable': (el) => {
          el.dataset.attached = 'true';
        }
      });

      await symbiote.attach();

      // Verify element is attached
      const div = document.querySelector('.js-removable');
      expect(div.dataset.attached).toBe('true');

      // Act - remove element
      div.remove();

      // Wait for MutationObserver
      await new Promise(resolve => setTimeout(resolve, 0));

      // Assert - element should be gone
      expect(document.querySelector('.js-removable')).toBeNull();
    });
  });

  describe('Performance and Cleanup', () => {
    it('should not attach to the same element twice', async () => {
      // Setup
      document.body.innerHTML = `<button class="js-button">Button</button>`;

      const attachCount = { count: 0 };
      const symbiote = createSymbiote({
        'js-button': (el) => {
          attachCount.count++;
          el.dataset.attachCount = attachCount.count;
        }
      });

      // Act - attach multiple times
      await symbiote.attach();
      await symbiote.attach();
      await symbiote.attach();

      // Assert
      const button = document.querySelector('.js-button');
      expect(button.dataset.attachCount).toBe('1');
      expect(attachCount.count).toBe(1);
    });

    it('should handle large DOM structures efficiently', async () => {
      // Setup - create a large DOM structure
      const container = document.createElement('div');
      for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.className = `js-item item-${i}`;
        container.appendChild(div);
      }
      document.body.appendChild(container);

      const attachCount = { count: 0 };
      const symbiote = createSymbiote({
        'js-item': (el) => {
          attachCount.count++;
        }
      });

      // Act
      const startTime = performance.now();
      await symbiote.attach();
      const endTime = performance.now();

      // Assert
      expect(attachCount.count).toBe(100);
      expect(endTime - startTime).toBeLessThan(100); // Should be fast
    });

    it('should work with custom root element', async () => {
      // Setup
      const customRoot = document.createElement('div');
      customRoot.innerHTML = `
        <button class="js-button">Button in custom root</button>
      `;
      document.body.appendChild(customRoot);

      const buttonHandler = vi.fn();
      const symbiote = createSymbiote({
        'js-button': (el) => {
          el.addEventListener('click', buttonHandler);
        }
      });

      // Act
      symbiote.attach(customRoot);

      // Assert
      const button = customRoot.querySelector('.js-button');
      button.click();
      expect(buttonHandler).toHaveBeenCalled();
    });
  });

  describe('Constructor and Factory Function', () => {
    it('should create symbiote instance with createSymbiote factory', () => {
      // Act
      const symbiote = createSymbiote({
        'test': (el) => el.dataset.test = 'true'
      });

      // Assert
      expect(symbiote).toBeDefined();
      expect(typeof symbiote.attach).toBe('function');
    });

    it('should handle undefined or null nodules', () => {
      // Act & Assert - should not throw
      expect(() => createSymbiote(null)).not.toThrow();
      expect(() => createSymbiote(undefined)).not.toThrow();
    });
  });

  describe('defineSetup Functionality', () => {
    it('should create and register a nodule globally', async () => {
      // Setup
      document.body.innerHTML = `<button class="js-dynamic">Dynamic button</button>`;

      const dynamicHandler = vi.fn();

      // Act - create nodule before symbiote
      const nodule = defineSetup('js-dynamic', (el) => {
        el.addEventListener('click', dynamicHandler);
      });

      const symbiote = createSymbiote({});
      await symbiote.attach();

      // Assert
      const button = document.querySelector('.js-dynamic');
      button.click();
      expect(dynamicHandler).toHaveBeenCalled();

      // Cleanup
      nodule.remove();
    });

    it('should apply nodule to existing symbiote instances', async () => {
      // Setup
      document.body.innerHTML = `<button class="js-existing">Existing button</button>`;

      const existingHandler = vi.fn();
      const symbiote = createSymbiote({});
      await symbiote.attach();

      // Act - create nodule after symbiote is attached
      const nodule = defineSetup('js-existing', (el) => {
        el.addEventListener('click', existingHandler);
      });

      // Assert
      const button = document.querySelector('.js-existing');
      button.click();
      expect(existingHandler).toHaveBeenCalled();

      // Cleanup
      nodule.remove();
    });

    it('should handle multiple symbiote instances', async () => {
      // Setup
      document.body.innerHTML = `
        <div id="root1">
          <button class="js-multi">Button 1</button>
        </div>
        <div id="root2">
          <button class="js-multi">Button 2</button>
        </div>
      `;

      const multiHandler = vi.fn();

      // Act - create nodule
      const nodule = defineSetup('js-multi', (el) => {
        el.addEventListener('click', multiHandler);
      });

      // Create two symbiote instances
      const symbiote1 = createSymbiote({});
      const symbiote2 = createSymbiote({});
      
      await symbiote1.attach(document.getElementById('root1'));
      await symbiote2.attach(document.getElementById('root2'));

      // Assert
      const buttons = document.querySelectorAll('.js-multi');
      buttons.forEach(button => button.click());
      expect(multiHandler).toHaveBeenCalledTimes(2);

      // Cleanup
      nodule.remove();
    });

    it('should allow removing nodules', async () => {
      // Setup
      document.body.innerHTML = `<button class="js-removable">Removable button</button>`;

      const removableHandler = vi.fn();

      // Act
      const nodule = defineSetup('js-removable', (el) => {
        el.addEventListener('click', removableHandler);
        // Return cleanup function
        return () => {
          el.removeEventListener('click', removableHandler);
        };
      });

      const symbiote = createSymbiote({});
      await symbiote.attach();

      // Test that it works
      const button = document.querySelector('.js-removable');
      button.click();
      expect(removableHandler).toHaveBeenCalledTimes(1);

      // Remove the nodule
      nodule.remove();

      // Test that it no longer works
      button.click();
      expect(removableHandler).toHaveBeenCalledTimes(1); // Still 1, not 2
    });

    it('should override existing nodules with same selector', async () => {
      // Setup
      document.body.innerHTML = `<button class="js-override">Override button</button>`;

      const firstHandler = vi.fn();
      const secondHandler = vi.fn();

      // Act
      const firstNodule = defineSetup('js-override', (el) => {
        el.addEventListener('click', firstHandler);
        // Return cleanup function
        return () => {
          el.removeEventListener('click', firstHandler);
        };
      });

      const symbiote = createSymbiote({});
      await symbiote.attach();

      // Test first handler
      const button = document.querySelector('.js-override');
      button.click();
      expect(firstHandler).toHaveBeenCalledTimes(1);

      // Create second nodule with same selector
      const secondNodule = defineSetup('js-override', (el) => {
        el.addEventListener('click', secondHandler);
        // Return cleanup function
        return () => {
          el.removeEventListener('click', secondHandler);
        };
      });

      // Test second handler (should replace first)
      button.click();
      expect(firstHandler).toHaveBeenCalledTimes(1); // Still 1
      expect(secondHandler).toHaveBeenCalledTimes(1); // Now 1

      // Cleanup
      firstNodule.remove();
      secondNodule.remove();
    });

    it('should work with symbiote constructor nodules', async () => {
      // Setup
      document.body.innerHTML = `<button class="js-mixed">Mixed button</button>`;

      const constructorHandler = vi.fn();
      const dynamicHandler = vi.fn();

      // Act
      const symbiote = createSymbiote({
        'js-mixed': (el) => {
          el.addEventListener('click', constructorHandler);
        }
      });

      // Add dynamic nodule with same selector
      const nodule = defineSetup('js-mixed', (el) => {
        el.addEventListener('click', dynamicHandler);
      });

      await symbiote.attach();

      // Assert - dynamic should override constructor
      const button = document.querySelector('.js-mixed');
      button.click();
      expect(constructorHandler).toHaveBeenCalledTimes(0);
      expect(dynamicHandler).toHaveBeenCalledTimes(1);

      // Cleanup
      nodule.remove();
    });
  });
});
