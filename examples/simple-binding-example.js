/**
 * Simple Binding Example
 * 
 * This example demonstrates the simple binding approach where
 * developers get a function they can call from any state manager.
 */

import { createSymbiote, createMutator, batch, destroy } from '../src/main.js';

// Example 1: Simple counter with manual state
const symbiote = createSymbiote({
  '.js-counter': (el, batch, stateManager) => {
    // Create mutator functions
    const updateCount = createMutator(el, 'textContent', '0', (value) => `Count: ${value}`);
    const updateButton = createMutator(el.querySelector('button'), 'disabled', false);
    
    // Manual state management
    let count = 0;
    
    el.addEventListener('click', () => {
      count++;
      updateCount(count);
      
      // Disable button when count reaches 10
      updateButton(count >= 10);
    });
  }
});

// Example 2: Using batch function for multiple DOM operations
const symbioteWithBatch = createSymbiote({
  '.js-batch-demo': (el, batch, stateManager) => {
    const updateText = createMutator(el.querySelector('.text'), 'textContent');
    const updateColor = createMutator(el.querySelector('.color'), 'style.color');
    const updateSize = createMutator(el.querySelector('.size'), 'style.fontSize');
    
    el.addEventListener('click', () => {
      // Batch multiple DOM operations
      batch(() => {
        updateText('Updated!');
        updateColor('red');
        updateSize('18px');
      });
    });
  }
});

// Example 3: Using destroy function for toggle behavior
const symbioteWithDestroy = createSymbiote({
  '.js-toggle': (el, batch, stateManager) => {
    const target = el.querySelector('.target');
    let isVisible = true;
    
    // Destroy the target element initially
    const resurrect = destroy(target);
    let remove = resurrect(); // Get the remove function
    
    el.addEventListener('click', () => {
      if (isVisible) {
        remove = remove(); // Remove element, get resurrect function
        isVisible = false;
      } else {
        remove = remove(); // Resurrect element, get remove function
        isVisible = true;
      }
    });
  }
});

// Example 2: With a simple state manager
const simpleState = {
  user: { name: 'John', age: 30 },
  count: 0,
  
  get(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], this);
  },
  
  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => obj[key], this);
    target[lastKey] = value;
  }
};

const symbioteWithState = createSymbiote({
  '.js-user-info': (el, batch, stateManager) => {
    // Create bind functions
    const updateName = createMutator(el.querySelector('.name'), 'textContent');
    const updateAge = createMutator(el.querySelector('.age'), 'textContent', '0', (value) => `Age: ${value}`);
    const updateStatus = createMutator(el, 'class', 'user-card');
    
    // Use with state manager
    if (stateManager) {
      // Initial values
      updateName(stateManager.get('user.name'));
      updateAge(stateManager.get('user.age'));
      
      // Update button
      el.querySelector('button').addEventListener('click', () => {
        const newAge = stateManager.get('user.age') + 1;
        stateManager.set('user.age', newAge);
        updateAge(newAge);
        
        // Update status based on age
        const status = newAge >= 18 ? 'adult' : 'minor';
        updateStatus(`user-card ${status}`);
      });
    }
  }
}, simpleState);

// Example 3: With Redux-like pattern
const reduxStore = {
  state: { todos: [], filter: 'all' },
  
  getState() {
    return this.state;
  },
  
  dispatch(action) {
    switch (action.type) {
      case 'ADD_TODO':
        this.state.todos.push(action.payload);
        break;
      case 'SET_FILTER':
        this.state.filter = action.payload;
        break;
    }
    // Notify subscribers
    this.subscribers.forEach(callback => callback());
  },
  
  subscribers: [],
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) this.subscribers.splice(index, 1);
    };
  }
};

const symbioteWithRedux = createSymbiote({
  '.js-todo-list': (el, batch, stateManager) => {
    const updateList = createMutator(el.querySelector('.todos'), 'innerHTML');
    const updateFilter = createMutator(el.querySelector('.filter'), 'textContent');
    
    if (stateManager) {
      // Initial render
      const render = () => {
        const { todos, filter } = stateManager.getState();
        const filteredTodos = filter === 'all' ? todos : todos.filter(todo => todo.status === filter);
        
        updateList(filteredTodos.map(todo => 
          `<div class="todo ${todo.status}">${todo.text}</div>`
        ).join(''));
        
        updateFilter(`Filter: ${filter}`);
      };
      
      // Subscribe to state changes
      stateManager.subscribe(render);
      render(); // Initial render
      
      // Add todo button
      el.querySelector('.add-todo').addEventListener('click', () => {
        const input = el.querySelector('input');
        if (input.value.trim()) {
          stateManager.dispatch({
            type: 'ADD_TODO',
            payload: { text: input.value, status: 'active' }
          });
          input.value = '';
        }
      });
      
      // Filter buttons
      el.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          stateManager.dispatch({
            type: 'SET_FILTER',
            payload: btn.dataset.filter
          });
        });
      });
    }
  }
}, reduxStore);

// Initialize all examples
Promise.all([
  symbiote.attach(),
  symbioteWithBatch.attach(),
  symbioteWithDestroy.attach(),
  symbioteWithState.attach(),
  symbioteWithRedux.attach()
]).then(() => {
  console.log('All binding examples initialized!');
});

export { symbiote, symbioteWithBatch, symbioteWithDestroy, symbioteWithState, symbioteWithRedux };
