import Symbiote from '../src/index.js';

new Symbiote({
    'test': function () {
        this.show = false;

        setTimeout(() => {
            this.show = true;
        }, 1000)

        var p2 = document.createElement('p');
        p2.setAttribute('class', 'js-test');
        p2.innerHTML = 'p2'
        // this.append(p1);
        this.prepend(p2);
    },
    'js-test': function () {
        console.log(this)
    },
    '#prevent': function () {
        console.log(this)
    }
}).attach();