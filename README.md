# Symbiote

A lightweight DOM attachment framework that automatically attaches behavior to elements based on CSS selectors.

## Installation

```bash
npm install symbiotic
```

## Usage

### ES Modules

```javascript
import createSymbiote from 'symbiotic';

const symbiote = createSymbiote({
  'js-button': (el) => {
    el.addEventListener('click', () => console.log('Button clicked!'));
  },
  'js-modal': (el) => {
    el.addEventListener('click', () => el.style.display = 'none');
  }
});

// Automatically waits for DOM to be ready
await symbiote.attach();
```

### Named Import

```javascript
import { createSymbiote, defineSetup } from 'symbiotic';

const symbiote = createSymbiote({
  'js-button': (el) => {
    el.addEventListener('click', () => console.log('Button clicked!'));
  }
});

await symbiote.attach();
```

### Dynamic Setup Function Creation

```javascript
import { defineSetup } from 'symbiotic';

// Create setup functions dynamically
const setup = defineSetup('js-dynamic', (el) => {
  el.addEventListener('click', () => console.log('Dynamic button clicked!'));
  // Return cleanup function (optional)
  return () => {
    el.removeEventListener('click', handler);
  };
});

// Remove the nodule later
nodule.remove();
```

### CommonJS

```javascript
const { createSymbiote } = require('symbiotic');

const symbiote = createSymbiote({
  'js-button': (el) => {
    el.addEventListener('click', () => console.log('Button clicked!'));
  }
});

await symbiote.attach();
```

### Direct Script Tag

```html
<script src="https://unpkg.com/symbiotic/dist/symbiote.iife.min.js"></script>
<script>
  const symbiote = Symbiote.createSymbiote({
    'js-button': (el) => {
      el.addEventListener('click', () => console.log('Button clicked!'));
    }
  });
  
  symbiote.attach().then(() => {
    console.log('Symbiote attached!');
  });
</script>
```

## Features

- **Automatic DOM Ready**: Waits for DOM to be ready before attaching
- **Tree Walker**: Efficiently traverses all DOM elements
- **MutationObserver**: Automatically handles dynamically added elements
- **Multiple Classes**: Elements with multiple classes get all relevant behaviors
- **Error Handling**: Graceful error handling with console logging
- **Lightweight**: ~1KB minified
- **No Dependencies**: Pure JavaScript, no external dependencies

## API

### `createSymbiote(nodules)`

Creates a new Symbiote instance.

**Parameters:**
- `nodules` (Object): An object mapping CSS class names to functions

**Returns:**
- `Symbiote`: A Symbiote instance

### `symbiote.attach(root?)`

Attaches the symbiote to the DOM.

**Parameters:**
- `root` (HTMLElement, optional): The root element to attach to. Defaults to `document.body`.

**Returns:**
- `Promise<void>`: Resolves when attachment is complete.

### `defineSetup(className, setupFunction)`

Creates a setup function dynamically and registers it globally.

**Parameters:**
- `className` (string): CSS class name for the setup function (e.g., `js-button`)
- `setupFunction` (function): Function to execute when elements with this class are found

**Returns:**
- `Object`: An object with a `remove()` method to unregister the setup function

**Note:** The setup function can optionally return a cleanup function that will be called when the setup function is removed.

## Examples

### Counter

```javascript
const symbiote = createSymbiote({
  'js-counter': (el) => {
    let count = 0;
    el.addEventListener('click', () => {
      count++;
      el.textContent = `Clicked ${count} times`;
    });
  }
});

await symbiote.attach();
```

### Modal

```javascript
const symbiote = createSymbiote({
  'js-modal-trigger': (el) => {
    el.addEventListener('click', () => {
      const modal = document.querySelector('.js-modal');
      modal.style.display = 'block';
    });
  },
  'js-modal-close': (el) => {
    el.addEventListener('click', () => {
      const modal = el.closest('.js-modal');
      modal.style.display = 'none';
    });
  }
});

await symbiote.attach();
```

### Form Validation

```javascript
const symbiote = createSymbiote({
  'js-validate': (el) => {
    el.addEventListener('blur', () => {
      if (!el.value) {
        el.classList.add('error');
      } else {
        el.classList.remove('error');
      }
    });
  }
});

await symbiote.attach();
```

### Functional Approach with defineSetup

```javascript
import { defineSetup } from 'symbiotic';

// Create reusable setup functions
const createButtonSetup = (message) => {
  return defineSetup('js-button', (el) => {
    const handler = () => console.log(message);
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  });
};

const createModalSetup = () => {
  return defineSetup('js-modal', (el) => {
    const handler = () => el.style.display = 'none';
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  });
};

// Use them functionally
const buttonNodule = createButtonNodule('Button clicked!');
const modalNodule = createModalNodule();

// Clean up when needed
// buttonNodule.remove();
// modalNodule.remove();
```

## License

MIT