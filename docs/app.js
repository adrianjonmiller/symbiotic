import Symbiote from '../src/index.js';

new Symbiote({
    'body': function () {
        this.style = {
            padding: '0 2rem',
            margin: '0 auto',
            maxWidth: '1080px',
            fontFamily: 'Helvetica, sans-serif'
        };

        var h1 = document.createElement('h1');
        this.append(h1, {
            'h1': function () {
                this.$node.innerHTML = 'Symbiote.js'
            }
        });

        var context = `<div aria-label="Show public link" class="toolbox-button js-showLink">
                                    <div>
                                        <div class="toolbox-icon" >
                                            <i class="icon-link"></i>
                                        </div>
                                    </div>
                                </div>`;
        var frag = document.createRange().createContextualFragment(context);

        this.prepend(frag.firstElementChild, {
            '.js-showLink': function () {
                console.log('success');
                this.$node.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log(e)
                    this.emit('showLinkBox')
                });
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
    }
}).attach();