import Symbiote from '../src/index.js';
import Button from './button.html';
import Plugin from 'Plugins/test'

new Symbiote({
    methods: {
        'body': function () {   
            this.data.something.test = 'success1'
        },
        '#todo': function () {
            this.data.something.test = 'success2'
        },
        '#test': function () {
            var div = document.createElement('div');
            this.append(div, function () {
                console.log(this)
            })

            this.render('<div class="something"></div>');
        }
    },
    plugins: [Plugin],
    data: {
        name: 'some data',
        something: {
            test: 'awesome'
        }
    }
}).attach();