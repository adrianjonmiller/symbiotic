import Symbiote from '../src/index.js';
import Button from './button.html';
import Plugin from 'Plugins/test'

new Symbiote({
    'body': function () {
        this.style = {
            padding: '0 2rem',
            margin: '0 auto',
            maxWidth: '1080px',
            fontFamily: 'Helvetica, sans-serif'
        };

        var frag = document.createRange().createContextualFragment(Button);

        var h1 = document.createElement('h1');
        this.append(h1, {
            'h1': function () {
                this.$node.innerHTML = 'Symbiote.js'
            }
        });

        this.append(frag.firstElementChild, {
            'button': function () {
                this.$event('click', function () {
                    console.log(this)
                })
            }
        });

        var div = document.createElement('div');
        var p = document.createElement('p');
        var input = document.createElement('input');
        var divNode = this.append(div);

        divNode.append(p, {
            'p': function () {
                this.$node.innerHTML = 'Copy this to install Symbiote.js'
            }
        });

        divNode.append(input, {
            'input': function () {
                this.$node.setAttribute('value', 'npm install https://github.com/adrianjonmiller/symbiote')
            }
        });
    },
    '#todo': function () {
        console.log(this)
    },
    '.test': function () {
    }
}, [Plugin]).attach();