'use strict';

import Model from './model';
import global from './global';

export default {
    id: 0,
    prefix: 'vnom-',
    camelCaseToDash: function (myStr) {
        return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },
    dashToCamelCase: function (myString) {
        return myString.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase();
        });
    },
    createStyleNode: function () {
        let styleNode = document.createElement('style');

        styleNode.type = 'text/css';

        return styleNode;
    },
    uid: function () {
        return this.prefix + this.id++;
    },
    debounce: function (func) {
        var frame = null;

        return function executedFunction() {
            let context = this;
            let args = arguments;

            if (frame !== null) window.cancelAnimationFrame(frame);

            frame = window.requestAnimationFrame(() => {
                func.apply(context, args);
            })
        }
    },
    isNode: function (o) {
        return typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    },
    check (item, cb) {
        if (item === null) {
            return false
        }
        
        if (item === undefined) {
            return false
        }

        switch (typeof item) {
            case 'array':
                if (item.length === 0) {
                    return false
                }
                break;
            case 'object':
                if (!this.isNode(item)) {
                    if (Object.keys(item).length === 0) {
                        return false
                    }
                }
                break;
            case 'string':
                if (item === '') {
                    return false
                }
                break;
        }

        if (typeof cb === 'function') {
            return cb.apply(null, [item]);
        }

        return true;
    },
    loop (object, cb) {
        let length = object.length;
        let result = [];

        if (length > 0) {
            for (let i=0; i < length; i++) {
                let res = cb.apply(null, [object[i], i, length]);
                if (res) {
                    result.push(res)
                }
            }
        } else {
            for (let key in object) {
                let res = cb.apply(null, [object[key], key]);
                if (res) {
                    result.push();
                }
            }
        }
        return result;
    },
    getTextNode ($child, cb) {
        if ($child.nodeType === 3) {
            if ($child.nodeValue.trim().length > 0 ) {
                return cb($child)
            }
        }
    },
    getTemplateNode ($node, cb) {
        if ($node.tagName === 'TEMPLATE') {
            if (typeof cb === 'function') {
                return cb.apply(null, [$node.innerHTML]);
            }
            return $node.innerHTML;
        }
     },
    stringRef (ref, object) {
        return ref.split('.').reduce((object,i) => {
            if (object[i]) {
                return object[i]
            } else {
                return ''
            }
        }, object);
    },
    init (vnom, methods) {
        methods = methods || global.methods;

        if (typeof methods === 'function') {
            methods.apply(vnom);
            return
        }

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
    },
    getScope (el) {
        if (el === undefined) {
            return document.body || document.querySelector('body');
        }
    
        switch (typeof el) {
            case 'string':
                return document.querySelector(el);
            case 'object':
                return el;            
        }
    },
    findHead ($node) {     
        if ($node.tagName === 'HTML') {
            return $node.querySelector('head')
        } else {
            return this.findHead($node.parentNode);
        }
    }
};