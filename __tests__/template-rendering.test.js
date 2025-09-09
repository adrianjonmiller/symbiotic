import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createSymbiote } from '../src/createSymbiote.js';

// Polyfill requestAnimationFrame for testing
if (typeof requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 16); // ~60fps
  };
}

describe('Template Rendering', () => {
  let consoleSpy;

  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should provide render function for template elements', async () => {
    // Setup
    document.body.innerHTML = `
      <template class="js-template">
        <div class="js-rendered">Rendered content</div>
      </template>
    `;

    let renderFunction;
    const symbiote = createSymbiote({
      '.js-template': (renderFn, batch) => {
        renderFunction = renderFn;
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    expect(typeof renderFunction).toBe('function');
  });

  it('should render template content after template element', async () => {
    // Setup
    document.body.innerHTML = `
      <div id="container">
        <template class="js-template">
          <div class="js-rendered">Rendered content</div>
        </template>
      </div>
    `;

    let renderFunction;
    const symbiote = createSymbiote({
      '.js-template': (renderFn, batch) => {
        renderFunction = renderFn;
      }
    });

    await symbiote.attach();

    // Act
    const template = document.querySelector('.js-template');
    renderFunction();

    // Assert
    const rendered = document.querySelector('.js-rendered');
    expect(rendered).toBeTruthy();
    expect(rendered.textContent).toBe('Rendered content');
  });

  it('should replace previously rendered content on multiple calls', async () => {
    // Setup
    document.body.innerHTML = `
      <div id="container">
        <template class="js-template">
          <div class="js-rendered">Rendered content</div>
        </template>
      </div>
    `;

    let renderFunction;
    const symbiote = createSymbiote({
      '.js-template': (renderFn, batch) => {
        renderFunction = renderFn;
      }
    });

    await symbiote.attach();

    // Act - first render
    const template = document.querySelector('.js-template');
    
    // Modify template content for first render
    template.content.querySelector('.js-rendered').textContent = 'First render';
    renderFunction();

    // Modify template content for second render
    template.content.querySelector('.js-rendered').textContent = 'Second render';
    renderFunction();

    // Assert
    const rendered = document.querySelector('.js-rendered');
    expect(rendered).toBeTruthy();
    expect(rendered.textContent).toBe('Second render');
    expect(document.querySelectorAll('.js-rendered')).toHaveLength(1);
  });

  it('should work with multiple template elements', async () => {
    // Setup
    document.body.innerHTML = `
      <div id="container">
        <template class="js-template1">
          <div class="js-rendered1">Content 1</div>
        </template>
        <template class="js-template2">
          <div class="js-rendered2">Content 2</div>
        </template>
      </div>
    `;

    const renderFunctions = {};
    const symbiote = createSymbiote({
      '.js-template1': (renderFn, batch) => {
        renderFunctions.template1 = renderFn;
      },
      '.js-template2': (renderFn, batch) => {
        renderFunctions.template2 = renderFn;
      }
    });

    await symbiote.attach();

    // Act
    renderFunctions.template1();
    renderFunctions.template2();

    // Assert
    const rendered1 = document.querySelector('.js-rendered1');
    const rendered2 = document.querySelector('.js-rendered2');
    
    expect(rendered1).toBeTruthy();
    expect(rendered1.textContent).toBe('Content 1');
    expect(rendered2).toBeTruthy();
    expect(rendered2.textContent).toBe('Content 2');
  });

  it('should not provide render function for non-template elements', async () => {
    // Setup
    document.body.innerHTML = `
      <div class="js-div">Regular div</div>
    `;

    let elementReceived;
    let batchFunction;
    const symbiote = createSymbiote({
      '.js-div': (el, batch) => {
        elementReceived = el;
        batchFunction = batch;
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    expect(elementReceived).toBeTruthy();
    expect(elementReceived.tagName).toBe('DIV');
    expect(typeof batchFunction).toBe('function');
  });

  it('should apply setup function to newly rendered nodes using symbiote infrastructure', async () => {
    // Setup
    document.body.innerHTML = `
      <div id="container">
        <template class="js-template">
          <button class="js-rendered-button">Rendered Button</button>
        </template>
      </div>
    `;

    let renderFunction;
    const buttonHandler = vi.fn();
    
    const symbiote = createSymbiote({
      '.js-template': (renderFn, batch) => {
        renderFunction = renderFn;
      },
      '.js-rendered-button': (el) => {
        el.addEventListener('click', buttonHandler);
      }
    });

    await symbiote.attach();

    // Act
    renderFunction();

    // Wait for symbiote to process the new nodes
    await new Promise(resolve => setTimeout(resolve, 10));

    // Assert
    const renderedButton = document.querySelector('.js-rendered-button');
    expect(renderedButton).toBeTruthy();
    
    renderedButton.click();
    expect(buttonHandler).toHaveBeenCalled();
  });
});
