import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createSymbiote } from '../src/createSymbiote.js';

// Polyfill requestAnimationFrame for testing
if (typeof requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 16); // ~60fps
  };
}

describe('Basic Functionality', () => {
  let consoleSpy;

  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should attach nodule functions to matching elements', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="js-button">Click me</button>
      <div class="js-modal">Modal content</div>
    `;

    const buttonClickHandler = vi.fn();
    const modalClickHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-button': (el) => {
        el.addEventListener('click', buttonClickHandler);
      },
      '.js-modal': (el) => {
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
      <div class="js-modal js-overlay">Modal with overlay</div>
    `;

    const modalHandler = vi.fn();
    const overlayHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-modal': (el) => {
        el.addEventListener('click', modalHandler);
      },
      '.js-overlay': (el) => {
        el.addEventListener('click', overlayHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const element = document.querySelector('.js-modal');
    element.click();

    expect(modalHandler).toHaveBeenCalled();
    expect(overlayHandler).toHaveBeenCalled();
  });

  it('should traverse nested elements with tree walker', async () => {
    // Setup
    document.body.innerHTML = `
      <div class="container">
        <div class="js-button">Nested button</div>
        <span class="js-text">Nested text</span>
      </div>
    `;

    const buttonHandler = vi.fn();
    const textHandler = vi.fn();

    const symbiote = createSymbiote({
      '.js-button': (el) => {
        el.addEventListener('click', buttonHandler);
      },
      '.js-text': (el) => {
        el.addEventListener('click', textHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const button = document.querySelector('.js-button');
    const text = document.querySelector('.js-text');

    button.click();
    text.click();

    expect(buttonHandler).toHaveBeenCalled();
    expect(textHandler).toHaveBeenCalled();
  });
});
