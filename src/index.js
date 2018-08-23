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

        ((cb) => {
            if (document.readyState !== 'loading') {
                this.init(cb());
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    this.init(cb());
                });
            }
        })(() => new Model($scope));
    }

    init (vnom) {
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
            })
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