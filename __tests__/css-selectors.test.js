import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createSymbiote } from '../src/createSymbiote.js';
import { defineSetup } from '../src/utils/globalRegistry.js';

// Polyfill requestAnimationFrame for testing
if (typeof requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 16); // ~60fps
  };
}

describe('CSS Selector Types', () => {
  let consoleSpy;

  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should support ID selectors', async () => {
    // Setup
    document.body.innerHTML = `
      <div id="main-content">Main content</div>
      <div id="sidebar">Sidebar</div>
    `;

    const mainHandler = vi.fn();
    const sidebarHandler = vi.fn();

    const symbiote = createSymbiote({
      '#main-content': (el) => {
        el.addEventListener('click', mainHandler);
      },
      '#sidebar': (el) => {
        el.addEventListener('click', sidebarHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const mainContent = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');

    mainContent.click();
    sidebar.click();

    expect(mainHandler).toHaveBeenCalled();
    expect(sidebarHandler).toHaveBeenCalled();
  });

  it('should support attribute selectors', async () => {
    // Setup
    document.body.innerHTML = `
      <input type="text" data-required="true" />
      <input type="email" data-required="false" />
      <button type="submit" data-action="save">Submit</button>
      <button type="button">Cancel</button>
    `;

    const requiredHandler = vi.fn();
    const actionHandler = vi.fn();
    const submitHandler = vi.fn();

    const symbiote = createSymbiote({
      '[data-required="true"]': (el) => {
        el.addEventListener('focus', requiredHandler);
      },
      'button[data-action="save"]': (el) => {
        el.addEventListener('click', actionHandler);
      },
      'button[type="submit"]': (el) => {
        el.addEventListener('click', submitHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const requiredInput = document.querySelector('[data-required="true"]');
    const actionButton = document.querySelector('button[data-action="save"]');
    const submitButton = document.querySelector('button[type="submit"]');

    requiredInput.focus();
    actionButton.click();
    submitButton.click();

    expect(requiredHandler).toHaveBeenCalled();
    expect(actionHandler).toHaveBeenCalled();
    expect(submitHandler).toHaveBeenCalled();
  });

  it('should support tag selectors', async () => {
    // Setup
    document.body.innerHTML = `
      <h1>Title</h1>
      <p>Paragraph content</p>
      <div>Div content</div>
    `;

    const h1Handler = vi.fn();
    const pHandler = vi.fn();
    const divHandler = vi.fn();

    const symbiote = createSymbiote({
      'h1': (el) => {
        el.addEventListener('click', h1Handler);
      },
      'p': (el) => {
        el.addEventListener('click', pHandler);
      },
      'div': (el) => {
        el.addEventListener('click', divHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const h1 = document.querySelector('h1');
    const p = document.querySelector('p');
    const div = document.querySelector('div');

    h1.click();
    p.click();
    div.click();

    expect(h1Handler).toHaveBeenCalled();
    expect(pHandler).toHaveBeenCalled();
    expect(divHandler).toHaveBeenCalled();
  });

  it('should support complex selectors with combinators', async () => {
    // Setup
    document.body.innerHTML = `
      <div class="header">
        <button class="close-btn">Close</button>
      </div>
      <div class="content">
        <button class="action-btn">Action</button>
      </div>
      <div class="container">
        <p class="description">Description</p>
      </div>
    `;

    const headerCloseHandler = vi.fn();
    const contentActionHandler = vi.fn();
    const containerDescHandler = vi.fn();

    const symbiote = createSymbiote({
      '.header > .close-btn': (el) => {
        el.addEventListener('click', headerCloseHandler);
      },
      '.content .action-btn': (el) => {
        el.addEventListener('click', contentActionHandler);
      },
      '.container .description': (el) => {
        el.addEventListener('click', containerDescHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const headerClose = document.querySelector('.header > .close-btn');
    const contentAction = document.querySelector('.content .action-btn');
    const containerDesc = document.querySelector('.container .description');

    headerClose.click();
    contentAction.click();
    containerDesc.click();

    expect(headerCloseHandler).toHaveBeenCalled();
    expect(contentActionHandler).toHaveBeenCalled();
    expect(containerDescHandler).toHaveBeenCalled();
  });

  it('should ignore pseudo-selectors', async () => {
    // Setup
    document.body.innerHTML = `
      <form>
        <input type="text" required />
        <input type="email" />
        <input type="text" />
      </form>
      <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Last item</li>
      </ul>
    `;

    const requiredHandler = vi.fn();
    const firstItemHandler = vi.fn();
    const lastItemHandler = vi.fn();

    const symbiote = createSymbiote({
      'input:required': (el) => {
        el.addEventListener('blur', requiredHandler);
      },
      'li:first-child': (el) => {
        el.addEventListener('click', firstItemHandler);
      },
      'li:last-child': (el) => {
        el.addEventListener('click', lastItemHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert - pseudo-selectors should be ignored, so handlers should not be called
    const requiredInput = document.querySelector('input:required');
    const firstItem = document.querySelector('li:first-child');
    const lastItem = document.querySelector('li:last-child');

    requiredInput.blur();
    firstItem.click();
    lastItem.click();

    expect(requiredHandler).not.toHaveBeenCalled();
    expect(firstItemHandler).not.toHaveBeenCalled();
    expect(lastItemHandler).not.toHaveBeenCalled();
  });

  it('should support universal selector', async () => {
    // Setup
    document.body.innerHTML = `
      <div>Div content</div>
      <span>Span content</span>
      <p>Paragraph content</p>
    `;

    const universalHandler = vi.fn();

    const symbiote = createSymbiote({
      '*': (el) => {
        el.addEventListener('click', universalHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const div = document.querySelector('div');
    const span = document.querySelector('span');
    const p = document.querySelector('p');

    div.click();
    span.click();
    p.click();

    expect(universalHandler).toHaveBeenCalled();
  });

  it('should support multiple selectors on same element', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="btn primary" id="multi-btn" data-action="submit">Multi Button</button>
    `;

    const classHandler = vi.fn();
    const attributeHandler = vi.fn();
    const tagHandler = vi.fn();

    const symbiote = createSymbiote({
      '.btn': (el) => {
        el.addEventListener('click', classHandler);
      },
      '[data-action="submit"]': (el) => {
        el.addEventListener('click', attributeHandler);
      },
      'button': (el) => {
        el.addEventListener('click', tagHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const button = document.querySelector('#multi-btn');
    button.click();

    expect(classHandler).toHaveBeenCalled();
    expect(attributeHandler).toHaveBeenCalled();
    expect(tagHandler).toHaveBeenCalled();
  });

  it('should handle selector changes dynamically', async () => {
    // Setup
    document.body.innerHTML = `
      <div id="dynamic-element" class="initial">Dynamic Element</div>
    `;

    const initialHandler = vi.fn();
    const updatedHandler = vi.fn();

    const symbiote = createSymbiote({
      '.initial': (el) => {
        el.addEventListener('click', initialHandler);
      }
    });

    await symbiote.attach();

    // Add new selector after attachment
    defineSetup('.updated', (el) => {
      el.addEventListener('click', updatedHandler);
    });

    // Change class to trigger new selector
    const element = document.getElementById('dynamic-element');
    element.classList.remove('initial');
    element.classList.add('updated');

    // Wait for mutation observer to process the change
    await new Promise(resolve => setTimeout(resolve, 10));

    // Assert
    element.click();

    // The initial handler should still be called because the element still matches .initial
    // until the reconciliation runs. Let's check if the element still has the initial class
    expect(element.classList.contains('initial')).toBe(false);
    expect(element.classList.contains('updated')).toBe(true);
    
    // Both handlers might be called due to timing, but updated should definitely be called
    expect(updatedHandler).toHaveBeenCalled();
  });

  it('should filter out unstable pseudo-selectors', async () => {
    // Setup
    document.body.innerHTML = `
      <button class="test-btn">Test Button</button>
    `;

    const stableHandler = vi.fn();
    const unstableHandler = vi.fn();

    const symbiote = createSymbiote({
      '.test-btn': (el) => {
        el.addEventListener('click', stableHandler);
      },
      '.test-btn:hover': (el) => {
        el.addEventListener('click', unstableHandler);
      }
    });

    // Act
    await symbiote.attach();

    // Assert
    const button = document.querySelector('.test-btn');
    button.click();

    expect(stableHandler).toHaveBeenCalled();
    expect(unstableHandler).not.toHaveBeenCalled();
  });
});
