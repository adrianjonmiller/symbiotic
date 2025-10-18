/**
 * Adapter System Example
 * 
 * This example demonstrates how to use Symbiote's adapter system
 * with different state managers.
 */

import { createSymbiote, bind, createAdapter } from '../src/main.js';

// Example 1: Simple State Manager
const simpleState = {
  data: {
    user: { name: 'John Doe', age: 30 },
    count: 0
  },
  
  get(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], this.data);
  },
  
  subscribe(path, callback) {
    // Simple polling for demonstration
    const interval = setInterval(() => {
      callback(this.get(path));
    }, 1000);
    
    return () => clearInterval(interval);
  }
};

// Example 2: Redux-like Store
const reduxStore = {
  state: {
    user: { name: 'Jane Smith', age: 25 },
    counter: { value: 0 }
  },
  
  getState() {
    return this.state;
  },
  
  subscribe(callback) {
    // Simple polling for demonstration
    const interval = setInterval(() => {
      callback();
    }, 1000);
    
    return () => clearInterval(interval);
  }
};

// Example 3: Zustand-like Store
const zustandStore = {
  state: {
    user: { name: 'Bob Wilson', age: 35 },
    todos: ['Learn Symbiote', 'Build app', 'Deploy']
  },
  
  getState() {
    return this.state;
  },
  
  subscribe(callback) {
    // Simple polling for demonstration
    const interval = setInterval(() => {
      callback(this.state);
    }, 1000);
    
    return () => clearInterval(interval);
  }
};

// Create adapters
const simpleAdapter = createAdapter(simpleState, 'simple');
const reduxAdapter = createAdapter(reduxStore, 'redux');
const zustandAdapter = createAdapter(zustandStore, 'zustand');

// Example usage with Symbiote
const symbiote = createSymbiote({
  '.js-simple-user': (el) => {
    // Simple binding
    bind('Hello from Simple State!', el, 'textContent');
  },
  
  '.js-simple-reactive': (el) => {
    // Reactive binding with simple adapter
    bind(() => simpleState.get('user.name'), el, 'textContent', null, simpleAdapter);
  },
  
  '.js-redux-user': (el) => {
    // Reactive binding with Redux adapter
    bind(() => reduxStore.getState().user.name, el, 'textContent', null, reduxAdapter);
  },
  
  '.js-zustand-user': (el) => {
    // Reactive binding with Zustand adapter
    bind(() => zustandStore.getState().user.name, el, 'textContent', null, zustandAdapter);
  },
  
  '.js-counter': (el) => {
    // Counter with transform
    bind(() => simpleState.get('count'), el, 'textContent', (value) => `Count: ${value}`, simpleAdapter);
  }
});

// Initialize
symbiote.attach().then(() => {
  console.log('Symbiote initialized with adapter system!');
  
  // Simulate state changes
  setInterval(() => {
    simpleState.data.count++;
    console.log('Simple state count:', simpleState.data.count);
  }, 2000);
});

export { symbiote, simpleState, reduxStore, zustandStore };
