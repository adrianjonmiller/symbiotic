import Model from './model';
import utils from './utils';
import global from './global';

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
    constructor (methods, plugins) {
        global.methods = methods;
        global.plugins = plugins;
    }

    attach (el) {
        const $scope = getScope(el);

        global.head = (function findHead ($node) {     
            if ($node.tagName === 'HTML') {
                return $node.querySelector('head')
            } else {
                return findHead($node.parentNode);
            }
        })($scope);


        utils.head = this.head;

        ;((cb) => {
            if (document.readyState !== 'loading') {
                cb();
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    cb();   
                });
            }
        })(() => {
            let t0 = performance.now();
            this.vnom = new Model($scope)

            this.vnom.on('!nodeAdded', (payload) => {
                this.init(payload.node, payload.methods);
            });

            this.init(this.vnom);

            let t1 = performance.now();
            console.log('JSI attached in ' + (t1 - t0) + ' milliseconds.');
        });
    }

    init (vnom, methods) {
        methods = methods || global.methods;
        var result = [];

        for (let method in methods) {
            let attribute = '';
            let attributeValue = '';

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
                    attribute = 'tagName'
                    attributeValue = method;
            }

            if (vnom[attribute]) {
                if (vnom[attribute].split(' ').indexOf(attributeValue) > -1) {

                    if (!vnom.methods) {
                        vnom.methods = {};
                    }

                    if (vnom.methods[method] === undefined) {
                        vnom.methods[method] = methods[method].bind(vnom);

                    }
                }
            }
        }

        if (vnom.child) {
            this.init(vnom.child, methods)
        }

        if (vnom.next) {
            this.init(vnom.next, methods)
        }

        for (let method in vnom.methods) {
            try {
                (vnom.methods[method])();
            } catch (error) {
                console.error(error.stack);
            }
        }
    }
}

if (window && window.Symbiote === undefined) {
    window.Symbiote = Symbiote;
}