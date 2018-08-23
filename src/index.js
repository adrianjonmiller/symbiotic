import Model from './model';
import utils from './utils';

function getScope (el) {
    if (el === undefined) {
        return document.body || document.querySelector('body');
    }

    switch (typeof el) {
        case 'string':
            return document.querySelector(el);
        case 'object':
            return el;            
    }
}

export default class Symbiote {
    constructor (methods) {
        this.methods = methods;
    }

    attach (el, attribute) {
        const $scope = getScope(el);

        this.attribute = attribute ? utils.dashToCamelCase(attribute) : 'class';
        this.head = (function findHead ($node) {     
            if ($node.tagName === 'HTML') {
                return $node.querySelector('head')
            } else {
                return findHead($node.parentNode);
            }
        })($scope);

        ;((cb) => {
            if (document.readyState !== 'loading') {
                var vnom = cb();
                vnom.on('nodeAppended', (newNode) => {
                    console.log('node appeneded')
                    this.init(newNode);
                });
                this.init(vnom);
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    var vnom = cb()
                    vnom.on('nodeAppended', (newNode) => {
                        console.log('node appeneded')
                        this.init(newNode);
                    });
                    this.init(vnom);
                });
            }
        })(() => new Model($scope));
    }

    init (vnom) {
        vnom._head = this.head;

        if (vnom[this.attribute]) {
            vnom[this.attribute].split(' ').filter((method) => {
                return Object.keys(this.methods).indexOf(method) > -1;
            }).map((method, index, array) => {
                if (!vnom.methods) {
                    vnom.methods = {};
                }

                vnom.methods[method] = this.methods[method].bind(vnom);

                if (index === array.length - 1) {
                    for (let method in vnom.methods) {
                        try {
                            (vnom.methods[method])()
                        } catch (error) {
                            console.error(error.stack);
                        }
                    }
                }
            });
        }

        if (vnom.child) {
            this.init(vnom.child)
        }

        if (vnom.next) {
            this.init(vnom.next)
        }
    }
}

if (window && window.Symbiote === undefined) {
    window.Symbiote = Symbiote;
}