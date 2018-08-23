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
                vnom.on('nodeAdded', (newNode) => {
                    
                    this.init(newNode);
                });
                this.init(vnom);
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    var vnom = cb()
                    vnom.on('nodeAdded', (newNode) => {
                        this.init(newNode);
                    });
                    this.init(vnom);
                });
            }
        })(() => new Model($scope));
    }

    init (vnom) {
        vnom._head = this.head;
        let attribute = '';
        let attributeValue = '';

        for (let method in this.methods) {
            switch (method.charAt(0)) {
                case '.':
                    attribute = 'class';
                    attributeValue = method.substring(1);     
                    break;
                case '#':
                    attribute = 'id';
                    attributeValue = method.substring(1);
                    break;
                default:
                    attribute = 'class'
                    attributeValue = method;
            }

            if (vnom[attribute]) {
                if (vnom[attribute].split(' ').indexOf(attributeValue) > -1) {
                    if (!vnom.methods) {
                        vnom.methods = {};
                    }

                    if (vnom.methods[method] === undefined) {
                        vnom.methods[method] = this.methods[method].bind(vnom);
                    }
                }
            }
        }

        for (let method in vnom.methods) {
            try {
                if (vnom._init === false) {
                    (vnom.methods[method])();
                    vnom._init = true;
                }
            } catch (error) {
                console.error(error.stack);
            }
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