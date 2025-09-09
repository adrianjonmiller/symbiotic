import { Symbiote } from './Symbiote.js';
import { registerSymbioteInstance } from './utils/globalRegistry.js';

// Public API
export function createSymbiote(modules) {
  const symbiote = new Symbiote(modules);
  registerSymbioteInstance(symbiote);
  return symbiote;
}
