import Symbiote from '../src/index.js';

new Symbiote({
    'test': function () {
        // var p1 = document.createElement('p');
        // p1.setAttribute('class', 'js-test');
        // p1.innerHTML = 'p1'

        var p2 = document.createElement('p');
        p2.setAttribute('class', 'js-test');
        p2.innerHTML = 'p2'
        // this.append(p1);
        this.prepend(p2);
    },
    'js-test': function () {
        console.log(this)
    }
}).attach();