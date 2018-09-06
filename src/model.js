'use strict';
/** 
 * TODO:
 * [ ]: Apply plugins directly to model
 * -- [ ]: At append time
 * -- [ ]: With bound method
 * [ ]: Apply data directly to model
 * -- [ ]: When appended
 * -- [ ]: With a bound method
 * [ ]: this.render function
 * -- [ ]: Accepts a string
 * -- [ ]: Accepts a dom node
 * -- 
 * [ ]: Uses a <template> if it exists
 * [ ]: make a @this method points to the root element ex: '@this': function () {
 *  console.log(this) <--- the root element of the append
 * }
*/

import utils from './utils';
import global from './global';
import observe from './observe';

export default class Model {
    constructor ($node, data) {    
        data = global.data || data;
        this.$styleNode = utils.createStyleNode();
        this.events = {};
        this.style = {};
        this.firstChild = null;
        this.lastChild = null;
        this.next = null;
        this.prev = null;
        this.$node = $node;
        this.tagName = $node.tagName.toLowerCase();
        this.id = $node.getAttribute('id') || utils.uid();
        this.show = true;
        this.textNodes = [];


        if (this.id !== $node.getAttribute('id')) {
            $node.setAttribute('id', this.id);
        }

        this.model = {
            data: observe(data, this.watchers),
            $node: $node,
            $event: this.$event.bind(this),
            textNodes: this.textNodes,
            on: this.on.bind(this),
            emit: this.emit.bind(this),
            append: this.append.bind(this),
            prepend: this.prepend.bind(this),
            find: this.find.bind(this),
            findParent: this.findParent.bind(this),
            render: this.render.bind(this)
        };

        global.vdom[this.id] = {
            tagName: this.tagName,
            id: this.id,
            show: this.show,
            nodeType: $node.nodeType
        }

        Object.defineProperty(this.model, 'id', {
            get: () => {
                return this.id;
            }
        });

        Object.defineProperty(this.model, 'tagName', {
            get: () => {
                return this.tagName;
            }
        });

        Object.defineProperty(this.model, 'show', {
            get: () => {
                return this.show;
            },
            set: (val) => {
                if (val) {
                    if ($node.style.removeProperty) {
                        $node.style.removeProperty('display');
                    } else {
                        $node.style.removeAttribute('display');
                    }
                } else {
                    $node.style.display = 'none'
                }
                this.show = val;
            }
        });

        Object.defineProperty(this.model, 'prev', {
            get: () => {
                return this.prev;
            },
            set: (val) => {
                this.prev = val;
                return this.prev;
            }
        });

        Object.defineProperty(this.model, 'next', {
            get: () => {
                return this.next;
            },
            set: (val) => {
                this.next = val;
                return this.next;
            }
        });

        Object.defineProperty(this.model, 'child', {
            get: () => {
                return this.firstChild;
            },
            set: (val) => {
                this.firstChild = val;
                return this.firstChild;
            }
        });

        Object.defineProperty(this.model, 'parent', {
            get: () => {
                return this.parent;
            },
            set: (val) => {
                this.parent = val
                return this.parent;
            }
        });

        Object.defineProperty(this.model, 'style', {
            get: () => {
                this.pdateStyles(this.style, this.$styleNode, this.id);
                return this.style;
            },
            set: (val) => {
                Object.assign(this.style, val);
                this.updateStyles(this.style, this.$styleNode, this.id);
                return this.style;
            }
        });


        utils.check($node.attributes, (attributes) => utils.loop(attributes, (attribute) => {
            let attrName = utils.dashToCamelCase(attribute.nodeName);
            let $attrValue = attribute.nodeValue;
    
            if (!this[attrName] && attrName !== 'id' && attrName !== 'for') {
                this[attrName] = $attrValue;

            Object.defineProperty(this.model, attrName, {
                get: () => {
                    return this[attrName]
                },
                set: (val) => {
                    if (this[attrName] !== val) {
                        this[attrName] = val;

                    ;(utils.debounce(($node) => {
                        $node.setAttribute(utils.camelCaseToDash(attrName), root[attrName]);
                    }))($node);
                    }
                }
            });
            }
        }));

        utils.check($node.childNodes, (children) => utils.loop(children, ($child) => {
            if ($child.nodeType === 1) {
                let child = new Model($child);
                child.parent = this.model;
    
                if (!this.lastChild) {
                    this.firstChild = child;
                    this.model.child = child;
                } else {
                    this.lastChild.next = child;
                    child.prev = this.lastChild;
                }
                this.lastChild = child;
            }
        }));

        this.template = utils.getTemplateNode($node);

        return this.model;
    }

    append($node, methods) {
        let node = new Model($node);
        node.parent = this.model;

        if (!this.firstChild) {
            this.firstChild = node;
        }

        if (this.lastChild) {
            node.prev = this.lastChild;
            this.lastChild.next = node;
        }
        
        this.lastChild = node;

        (utils.debounce(() => {
            this.$node.appendChild(node.$node);
            this.emit('!nodeAdded', { node: node, methods: methods });
        }))();

        return node;
    }

    prepend($node, methods) {  
        let node = new Model($node);
        node.parent = this.model;

        if (this.firstChild) {
            node.next = this.firstChild;
            this.firstChild.prev = node;
        }

        this.firstChild = node;

        (utils.debounce(() => {
            this.$node.prepend(node.$node);
            this.emit('!nodeAdded', { node: node, methods: methods });
        }))();

        return node;
    }

    $event(event, cb, useCapture) {
        useCapture = useCapture || false;
        this.$node.addEventListener(event, (e) => cb.apply(this.model, [e]), useCapture)
    }

    render (template, data) {
        console.log(template)
        // let template = document.createRange().createContextualFragment(template);
    }

    emit(event, payload) {
        let bubbles = true;
        payload = payload || this.model;

        if (this.events === undefined) {
            this.events = {};
        }

        if (this.events[event]) {
            for (let i = 0; i < this.events[event].length; i++) {
                let e = this.events[event][i];

                e.fn(payload);
                bubbles = !e.bubbles ? e.bubbles : bubbles;
            }
        }

        if (bubbles && this.parent) {
            this.parent.emit(event, payload);
        }
    }

    find(attrName, value, cb) {
        let result = [];

        attrName = utils.dashToCamelCase(attrName);

        (function dig(vnode) {
            if (vnode) {
                if (vnode[attrName] !== undefined && vnode[attrName].indexOf(value) > -1) {
                    if (typeof cb === 'function') {
                        cb(vnode);
                    }

                    result.push(vnode);
                }

                if (vnode.child) {
                    dig(vnode.child);
                }

                if (vnode.next) {
                    dig(vnode.next);
                }
            }

        })(this.firstChild);

        return result;
    }

    findParent(attrName, value, cb) {
        let result = [];
        attrName = utils.dashToCamelCase(attrName);

        (function dig(vnode) {
            if (vnode) {
                if (vnode[attrName] !== undefined && vnode[attrName].indexOf(value) > -1) {
                    if (typeof cb === 'function') {
                        cb(vnode);
                    }

                    result.push(vnode);
                }

                if (vnode.parent) {
                    dig(vnode.parent);
                }
            }

        })(this.firstChild);

        return result;
    }

    on (event, fn) {
        event = event.split('.');
        var name = event[0];
        var bubbles = event[1] !== 'prevent';

        if (this.events === undefined) {
            this.events = {};
        }

        if (this.events[name] === undefined) {
            this.events[name] = [];
        }

        this.events[name].push( {fn: fn, bubbles: bubbles} );
    }

    updateStyles () {
        (utils.debounce(() => {
            if (!utils.check(this.style)) {
                this.$styleNode.innerHTML = ''
                return
            }
    
            var styleString = `#${this.id}{`;
   
            utils.loop(this.style, function (value, prop) {
                styleString += `${utils.camelCaseToDash(prop)}:${value};`;
            })
    
            styleString += '}';
    
            if (this.$styleNode.parentNode === null) {
                global.head.appendChild(this.$styleNode);
            }
    
            this.$styleNode.innerHTML = styleString;
        }))();
    }
}