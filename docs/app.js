import Symbiote from '../src/index.js';

new Symbiote({
    'div': function () {
        var p2 = document.createElement('p');
        p2.setAttribute('class', 'js-test');
        p2.innerHTML = 'test'
        this.append(p2, {
            'p': function () {
                // this.style.backgroundColor = 'red'
            }
        });
        this.style = {
            backgroundColor: 'blue'
        }
    },
    'p': function () {
        this.style.backgroundColor = 'oranage';
    }
}).attach();