export { createSymbiote } from './Symbiote.js';
export { defineSetup } from './utils/globalRegistry.js';
export { createMutator, destroy, batch } from './mutation.js';

// Default export for import createSymbiote from 'symbiotic'
export { createSymbiote as default, Symbiote } from './Symbiote.js';