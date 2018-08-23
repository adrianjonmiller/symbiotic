/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Symbiote; });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");



function getScope(el) {
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

class Symbiote {
    constructor(methods) {
        this.methods = methods;
    }

    attach(el, attribute) {
        const $scope = getScope(el);
        this.attribute = attribute ? _utils__WEBPACK_IMPORTED_MODULE_1__["default"].dashToCamelCase(attribute) : 'class';

        (cb => {
            if (document.readyState !== 'loading') {
                this.init(cb());
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    this.init(cb());
                });
            }
        })(() => new _model__WEBPACK_IMPORTED_MODULE_0__["default"]($scope));
    }

    init(vnom) {
        if (vnom[this.attribute]) {
            vnom[this.attribute].split(' ').filter(method => {
                return Object.keys(this.methods).indexOf(method) > -1;
            }).map((method, index, array) => {
                if (!vnom.methods) {
                    vnom.methods = {};
                }

                vnom.methods[method] = this.methods[method].bind(vnom);

                if (index === array.length - 1) {
                    for (let method in vnom.methods) {
                        try {
                            vnom.methods[method]();
                        } catch (error) {
                            console.error(error.stack);
                        }
                    }
                }
            });
        }

        if (vnom.child) {
            this.init(vnom.child);
        }

        if (vnom.next) {
            this.init(vnom.next);
        }
    }
}

if (window && window.Symbiote === undefined) {
    window.Symbiote = Symbiote;
}

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Model; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");


const head = document.head || document.querySelector('head');

function updateStyles(style, $styleNode, id) {
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].debounce(() => {
        if (Object.keys(style).length === 0) {
            $styleNode.innerHTML = '';
            return;
        }

        var styleString = `#${id}{`;

        for (let prop in style) {
            styleString += `${_utils__WEBPACK_IMPORTED_MODULE_0__["default"].camelCaseToDash(prop)}:${style[prop]};`;
        }

        styleString += '}';

        if ($styleNode.parentNode === null) {
            head.appendChild($styleNode);
        }

        $styleNode.innerHTML = styleString;
    })();
}

class Model {
    constructor($node) {
        this.$styleNode = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].createStyleNode();
        this.events = {};
        this.style = {
            color: 'blue'
        };
        this.firstChild = null;
        this.lastChild = null;
        this.next = null;
        this.prev = null;
        this.$node = $node;
        this.tagName = $node.tagName;
        this.id = $node.getAttribute('id') || _utils__WEBPACK_IMPORTED_MODULE_0__["default"].uid();

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

        Object.defineProperty(this.model, 'prev', {
            get: () => {
                return this.prev;
            },
            set: val => {
                this.prev = val;
                return this.prev;
            }
        });

        Object.defineProperty(this.model, 'next', {
            get: () => {
                return this.next;
            },
            set: val => {
                this.next = val;
                return this.next;
            }
        });

        Object.defineProperty(this.model, 'child', {
            get: () => {
                return this.firstChild;
            },
            set: val => {
                this.firstChild = val;
                return this.firstChild;
            }
        });

        Object.defineProperty(this.model, 'parent', {
            get: () => {
                return this.parent;
            },
            set: val => {
                this.parent = val;
                return this.parent;
            }
        });

        Object.defineProperty(this.model, 'style', {
            get: () => {
                updateStyles(this.style, this.$styleNode, this.id);
                return this.style;
            },
            set: val => {
                Object.assign(this.style, val);
                updateStyles(this.style, this.$styleNode, this.id);
                return this.style;
            }
        });

        if ($node.attributes) {
            for (let i = 0; i < $node.attributes.length; i++) {
                let attrName = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].dashToCamelCase($node.attributes[i].nodeName);
                let $attrValue = $node.attributes[i].nodeValue;

                if (!this[attrName]) {
                    this[attrName] = $attrValue;

                    Object.defineProperty(this.model, attrName, {
                        get: () => {
                            return this[attrName];
                        },
                        set: val => {
                            if (this[attrName] !== val) {
                                this[attrName] = val;

                                ;_utils__WEBPACK_IMPORTED_MODULE_0__["default"].debounce($node => {
                                    $node.setAttribute(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].camelCaseToDash(attrName), this[attrName]);
                                })($node);
                            }
                            return this[attrName];
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

        attrName = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].dashToCamelCase(attrName);

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
        attrName = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].dashToCamelCase(attrName);

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

    on(event, fn) {
        event = event.split('.');
        var name = event[0];
        var bubbles = event[1] !== 'prevent';

        if (this.events === undefined) {
            this.events = {};
        }

        if (this.events[name] === undefined) {
            this.events[name] = [];
        }

        this.events[name].push({ fn: fn, bubbles: bubbles });
    }
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
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
            });
        };
    }
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map