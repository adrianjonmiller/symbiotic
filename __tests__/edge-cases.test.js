import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createSymbiote } from '../src/createSymbiote.js';

// Polyfill requestAnimationFrame for testing
if (typeof requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 16); // ~60fps
  };
}

describe('Edge Cases and Error Handling', () => {
  let consoleSpy;

  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should handle empty setup functions object', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-button">Click me</button>
    `;

    const symbiote = createSymbiote({});

    // Act
    await symbiote.attach();

    // Assert - should not throw any errors
    expect(true).toBe(true);
  });

  it('should handle elements with no classes', async () => {
    // Setup
    document.body.innerHTML = `
      <div>No classes</div>
      <button class="js-button">Has class</button>
    `;

    const buttonHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-button': (el) => {
        el.addEventListener('click', buttonHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const button = document.querySelector('.js-button');
    button.click();

    expect(buttonHandler).toHaveBeenCalled();
  });

  it('should handle non-HTML elements', async () => {
    // Setup
    document.body.innerHTML = `
      <svg class="js-svg">SVG content</svg>
      <button class="js-button">Button</button>
    `;

    const svgHandler = vi.fn();
    const buttonHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-svg': (el) => {
        el.addEventListener('click', svgHandler);
      },
      '.js-button': (el) => {
        el.addEventListener('click', buttonHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const svg = document.querySelector('.js-svg');
    const button = document.querySelector('.js-button');

    // Use dispatchEvent for SVG elements as they don't have click() method in JSDOM
    svg.dispatchEvent(new Event('click'));
    button.click();

    expect(svgHandler).toHaveBeenCalled();
    expect(buttonHandler).toHaveBeenCalled();
  });

  it('should not attach to elements without matching classes', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="other-class">No match</button>
      <div class="js-target">Target</div>
    `;

    const targetHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-target': (el) => {
        el.addEventListener('click', targetHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const noMatch = document.querySelector('.other-class');
    const target = document.querySelector('.js-target');

    noMatch.click();
    target.click();

    expect(targetHandler).toHaveBeenCalledTimes(1);
  });

  it('should catch and log errors in nodule functions', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-error">Error button</button>
      <button class="js-normal">Normal button</button>
    `;

    const normalHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-error': (el) => {
        throw new Error('Test error');
      },
      '.js-normal': (el) => {
        el.addEventListener('click', normalHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error attaching selector ".js-error"'),
      expect.any(Error)
    );

    const normalButton = document.querySelector('.js-normal');
    normalButton.click();

    expect(normalHandler).toHaveBeenCalled();
  });

  it('should continue processing other elements after an error', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-error">Error button</button>
      <button class="js-success">Success button</button>
    `;

    const successHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-error': (el) => {
        throw new Error('Test error');
      },
      '.js-success': (el) => {
        el.addEventListener('click', successHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    expect(consoleSpy).toHaveBeenCalled();

    const successButton = document.querySelector('.js-success');
    successButton.click();

    expect(successHandler).toHaveBeenCalled();
  });
});
