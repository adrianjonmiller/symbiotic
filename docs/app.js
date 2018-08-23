import Symbiote from '../src/index.js';

new Symbiote({
    'test': function () {
        this.style.color = 'blue'
    } 
}).attach();