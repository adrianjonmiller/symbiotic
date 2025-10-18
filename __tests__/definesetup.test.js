import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createSymbiote } from '../src/main.js';
import { defineSetup } from '../src/utils/globalRegistry.js';

// Polyfill requestAnimationFrame for testing
if (typeof requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 16); // ~60fps
  };
}

describe('defineSetup Functionality', () => {
  let consoleSpy;

  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should create and register a nodule globally', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-global">Global Button</button>
    `;

    const globalHandler = vi.fn();

    // Act
    defineSetup('.js-global', (el) => {
      el.addEventListener('click', globalHandler);
    });

    const symbiote = createSymbiote({});
    await symbiote.attach();

    // Assert
    const button = document.querySelector('.js-global');
    button.click();
    expect(globalHandler).toHaveBeenCalled();
  });

  it('should apply nodule to existing symbiote instances', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-existing">Existing Button</button>
    `;

    const existingHandler = vi.fn();

    // Act
    const symbiote = createSymbiote({});
    await symbiote.attach();

    // Add setup function after symbiote is already attached
    defineSetup('.js-existing', (el) => {
      el.addEventListener('click', existingHandler);
    });

    // Assert
    const button = document.querySelector('.js-existing');
    button.click();
    expect(existingHandler).toHaveBeenCalled();
  });

  it('should handle multiple symbiote instances', async () => {
    // Setup
    document.body.innerHTML = `
      <div id="container1">
        <button class="js-multi">Multi Button 1</button>
      </div>
      <div id="container2">
        <button class="js-multi">Multi Button 2</button>
      </div>
    `;

    const multiHandler = vi.fn();

    // Act
    const symbiote1 = createSymbiote({});
    const symbiote2 = createSymbiote({});
    
    await symbiote1.attach();
    await symbiote2.attach();

    // Add setup function after both symbiotes are attached
    defineSetup('.js-multi', (el) => {
      el.addEventListener('click', multiHandler);
    });

    // Assert
    const buttons = document.querySelectorAll('.js-multi');
    buttons.forEach(button => button.click());
    expect(multiHandler).toHaveBeenCalledTimes(2);
  });

  it('should allow removing setup functions', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-removable">Removable Button</button>
    `;

    const removableHandler = vi.fn();

    // Act
    defineSetup('.js-removable', (el) => {
      el.addEventListener('click', removableHandler);
      return () => {
        el.removeEventListener('click', removableHandler);
      };
    });

    const symbiote = createSymbiote({});
    await symbiote.attach();

    // Remove the setup function
    defineSetup('.js-removable', null);

    // Assert
    const button = document.querySelector('.js-removable');
    button.click();
    expect(removableHandler).not.toHaveBeenCalled();
  });

  it('should override existing setup functions with same selector', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-override">Override Button</button>
    `;

    const firstHandler = vi.fn();
    const secondHandler = vi.fn();

    // Act
    defineSetup('.js-override', (el) => {
      el.addEventListener('click', firstHandler);
      return () => {
        el.removeEventListener('click', firstHandler);
      };
    });

    const symbiote = createSymbiote({});
    await symbiote.attach();

    // Override with new setup function
    defineSetup('.js-override', (el) => {
      el.addEventListener('click', secondHandler);
      return () => {
        el.removeEventListener('click', secondHandler);
      };
    });

    // Assert
    const button = document.querySelector('.js-override');
    button.click();
    expect(firstHandler).not.toHaveBeenCalled();
    expect(secondHandler).toHaveBeenCalled();
  });

  it('should work with symbiote constructor setup functions', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-constructor">Constructor Button</button>
    `;

    const constructorHandler = vi.fn();
    const defineHandler = vi.fn();

    // Act
    const symbiote = createSymbiote({
      '.js-constructor': (el) => {
        el.addEventListener('click', constructorHandler);
      }
    });

    await symbiote.attach();

    // Add additional setup function via defineSetup
    defineSetup('.js-constructor', (el) => {
      el.addEventListener('click', defineHandler);
    });

    // Assert
    const button = document.querySelector('.js-constructor');
    button.click();
    expect(constructorHandler).toHaveBeenCalled();
    expect(defineHandler).toHaveBeenCalled();
  });

  it('should provide batch function as second argument', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-batch">Batch Button</button>
    `;

    let batchFunction;
    const symbiote = createSymbiote({
      '.js-batch': (el, batch) => {
        batchFunction = batch;
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    expect(typeof batchFunction).toBe('function');
  });

  it('batch function should return a promise', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-batch-promise">Batch Promise Button</button>
    `;

    let batchFunction;
    const symbiote = createSymbiote({
      '.js-batch-promise': (el, batch) => {
        batchFunction = batch;
      }
    });

    await symbiote.attach();

    // Act
    const batchPromise = batchFunction(() => {
      // Some DOM operations
    });

    // Assert
    expect(batchPromise).toBeInstanceOf(Promise);
  });

  it('batch function should run async on render frame or next tick', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-batch-async">Batch Async Button</button>
    `;

    let batchFunction;
    const symbiote = createSymbiote({
      '.js-batch-async': (el, batch) => {
        batchFunction = batch;
      }
    });

    await symbiote.attach();

    // Act
    let executed = false;
    const batchPromise = batchFunction(() => {
      executed = true;
    });

    // Assert - should not execute immediately
    expect(executed).toBe(false);

    // Wait for the batch to execute
    await batchPromise;
    expect(executed).toBe(true);
  });
});
