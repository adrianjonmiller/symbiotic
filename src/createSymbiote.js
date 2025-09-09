import { Symbiote } from './Symbiote.js';
import { registerSymbioteInstance } from './utils/globalRegistry.js';

// Export the Symbiote class
export { Symbiote };

// Public API
export function createSymbiote(modules) {
  const symbiote = new Symbiote(modules);
  registerSymbioteInstance(symbiote);
  return symbiote;
}
