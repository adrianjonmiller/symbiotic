import Symbiote from '../dist/main.js';

console.log(Symbiote)

new Symbiote({
    'test': function () {
        console.log(this)
    } 
}).attach();