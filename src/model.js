import utils from './utils';

function updateStyles (style, $styleNode, id, head) {
    console.log(head);
    (utils.debounce(() => {
        if (Object.keys(style).length === 0) {
            $styleNode.innerHTML = ''
            return
        }

        var styleString = `#${id}{`;

        for (let prop in style) {
            styleString += `${utils.camelCaseToDash(prop)}:${style[prop]};`;
        }

        styleString += '}';

        if ($styleNode.parentNode === null) {
            head.appendChild($styleNode);
        }

        $styleNode.innerHTML = styleString;
    }))();
}

export default class Model {
    constructor ($node) {
        this.$styleNode = utils.createStyleNode();
        this.events = {};
        this.style = {};
        this.firstChild = null;
        this.lastChild = null;
        this.next = null;
        this.prev = null;
        this.$node = $node;
        this.tagName = $node.tagName;
        this.id = $node.getAttribute('id') || utils.uid();
        this.head = null;

        if (this.id !== $node.getAttribute('id')) {
            $node.setAttribute('id', this.id);
        }

        this.model = {
            $node: $node,
            on: this.on.bind(this),
            emit: this.emit.bind(this),
            append: this.append.bind(this),
            find: this.find.bind(this),
            findParent: this.findParent.bind(this)
        };

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

        Object.defineProperty(this.model, '_head', {
            get: () => {
                return this.head;
            },
            set: (val) => {
                this.head = val
            }
        })

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
                updateStyles(this.style, this.$styleNode, this.id, this.head);
                return this.style;
            },
            set: (val) => {
                Object.assign(this.style, val);
                updateStyles(this.style, this.$styleNode, this.id, this.head);
                return this.style;
            }
        });

        if ($node.attributes) {
            for (let i = 0; i < $node.attributes.length; i++) {
                let attrName = utils.dashToCamelCase($node.attributes[i].nodeName);
                let $attrValue = $node.attributes[i].nodeValue;

                if (!this[attrName]) {
                    this[attrName] = $attrValue;

                    Object.defineProperty(this.model, attrName, {
                        get: () => {
                            return this[attrName]
                        },
                        set: (val) => {
                            if (this[attrName] !== val) {
                                this[attrName] = val;

                                ; (utils.debounce(($node) => {
                                    $node.setAttribute(utils.camelCaseToDash(attrName), this[attrName]);
                                }))($node);
                            }
                            return this[attrName]
                        }
                    });
                }
            }
        } 

        if ($node.childNodes) {
            for (let i = 0; i < $node.childNodes.length; i++) {
                let $child = $node.childNodes[i];

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
            }
        }

        return this.model;
    }

    append($node, after) {
        after = after || this.lastChild;

        let node = new Model($node);
        node.parent = this.model;

        if (after) {
            node.prev = after;
            after = node;
        }

        if (!this.firstChild) {
            this.firstChild = node;
        }

        this.lastChild = node;
        this.$node.appendChild(node.$node);
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
}