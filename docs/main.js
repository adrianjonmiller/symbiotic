(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./docs/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./docs/app.js":
/*!*********************!*\
  !*** ./docs/app.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ../src/index.js */ "./src/index.js");

var _index2 = _interopRequireDefault(_index);

var _button = __webpack_require__(/*! ./button.html */ "./docs/button.html");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_button2.default);

new _index2.default({
    'body': function body() {
        this.style = {
            padding: '0 2rem',
            margin: '0 auto',
            maxWidth: '1080px',
            fontFamily: 'Helvetica, sans-serif'
        };

        var frag = document.createRange().createContextualFragment(_button2.default);

        console.log(frag);

        var h1 = document.createElement('h1');
        this.append(h1, {
            'h1': function h1() {
                this.$node.innerHTML = 'Symbiote.js';
            }
        });

        this.append(frag.firstElementChild, {
            'button': function button() {
                this.$event('click', function () {
                    console.log(this);
                });
            }
        });

        var div = document.createElement('div');
        var p = document.createElement('p');
        var input = document.createElement('input');
        var divNode = this.append(div);
        divNode.append(p, {
            'p': function p() {
                this.$node.innerHTML = 'Copy this to install Symbiote.js';
            }
        });

        divNode.append(input, {
            'input': function input() {
                this.$node.setAttribute('value', 'npm install https://github.com/adrianjonmiller/symbiote');
            }
        });
    }
}).attach();

/***/ }),

/***/ "./docs/button.html":
/*!**************************!*\
  !*** ./docs/button.html ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button>Button</button>";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _model = __webpack_require__(/*! ./model */ "./src/model.js");

var _model2 = _interopRequireDefault(_model);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getScope(el) {
    if (el === undefined) {
        return document.body || document.querySelector('body');
    }

    switch (typeof el === 'undefined' ? 'undefined' : _typeof(el)) {
        case 'string':
            return document.querySelector(el);
        case 'object':
            return el;
    }
}

var Symbiote = function () {
    function Symbiote(methods) {
        _classCallCheck(this, Symbiote);

        this.methods = methods;
    }

    _createClass(Symbiote, [{
        key: 'attach',
        value: function attach(el) {
            var _this = this;

            var $scope = getScope(el);

            this.head = function findHead($node) {
                if ($node.tagName === 'HTML') {
                    return $node.querySelector('head');
                } else {
                    return findHead($node.parentNode);
                }
            }($scope);

            _utils2.default.head = this.head;

            ;(function (cb) {
                if (document.readyState !== 'loading') {
                    cb();
                } else {
                    document.addEventListener('DOMContentLoaded', function () {
                        cb();
                    });
                }
            })(function () {
                var t0 = performance.now();
                var vnom = new _model2.default($scope);

                vnom.on('!nodeAdded', function (payload) {
                    _this.init(payload.node, payload.methods);
                });

                _this.init(vnom);

                var t1 = performance.now();
                console.log('JSI attached in ' + (t1 - t0) + ' milliseconds.');
            });
        }
    }, {
        key: 'init',
        value: function init(vnom, methods) {
            methods = methods || this.methods;
            var result = [];

            for (var method in methods) {
                var attribute = '';
                var attributeValue = '';

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
                        attribute = 'tagName';
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
                this.init(vnom.child, methods);
            }

            if (vnom.next) {
                this.init(vnom.next, methods);
            }

            for (var _method in vnom.methods) {
                try {
                    vnom.methods[_method]();
                } catch (error) {
                    console.error(error.stack);
                }
            }
        }
    }]);

    return Symbiote;
}();

exports.default = Symbiote;


if (window && window.Symbiote === undefined) {
    window.Symbiote = Symbiote;
}
module.exports = exports['default'];

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function updateStyles(style, $styleNode, id) {
    _utils2.default.debounce(function () {
        if (Object.keys(style).length === 0) {
            $styleNode.innerHTML = '';
            return;
        }

        var styleString = '#' + id + '{';

        for (var prop in style) {
            styleString += _utils2.default.camelCaseToDash(prop) + ':' + style[prop] + ';';
        }

        styleString += '}';

        if ($styleNode.parentNode === null) {
            _utils2.default.head.appendChild($styleNode);
        }

        $styleNode.innerHTML = styleString;
    })();
}

var Model = function () {
    function Model($node) {
        var _this = this;

        _classCallCheck(this, Model);

        this.$styleNode = _utils2.default.createStyleNode();
        this.events = {};
        this.style = {};
        this.firstChild = null;
        this.lastChild = null;
        this.next = null;
        this.prev = null;
        this.$node = $node;
        this.tagName = $node.tagName.toLowerCase();
        this.id = $node.getAttribute('id') || _utils2.default.uid();
        this.head = null;
        this.show = true;

        if (this.id !== $node.getAttribute('id')) {
            $node.setAttribute('id', this.id);
        }

        this.model = {
            $node: $node,
            $event: this.$event.bind(this),
            on: this.on.bind(this),
            emit: this.emit.bind(this),
            append: this.append.bind(this),
            prepend: this.prepend.bind(this),
            find: this.find.bind(this),
            findParent: this.findParent.bind(this)
        };

        Object.defineProperty(this.model, 'id', {
            get: function get() {
                return _this.id;
            }
        });

        Object.defineProperty(this.model, 'tagName', {
            get: function get() {
                return _this.tagName;
            }
        });

        Object.defineProperty(this.model, 'show', {
            get: function get() {
                return _this.show;
            },
            set: function set(val) {
                if (val) {
                    if ($node.style.removeProperty) {
                        $node.style.removeProperty('display');
                    } else {
                        $node.style.removeAttribute('display');
                    }
                } else {
                    $node.style.display = 'none';
                }
                _this.show = val;
            }
        });

        Object.defineProperty(this.model, '_head', {
            get: function get() {
                return _this.head;
            },
            set: function set(val) {
                _this.head = val;
            }
        });

        Object.defineProperty(this.model, 'prev', {
            get: function get() {
                return _this.prev;
            },
            set: function set(val) {
                _this.prev = val;
                return _this.prev;
            }
        });

        Object.defineProperty(this.model, 'next', {
            get: function get() {
                return _this.next;
            },
            set: function set(val) {
                _this.next = val;
                return _this.next;
            }
        });

        Object.defineProperty(this.model, 'child', {
            get: function get() {
                return _this.firstChild;
            },
            set: function set(val) {
                _this.firstChild = val;
                return _this.firstChild;
            }
        });

        Object.defineProperty(this.model, 'parent', {
            get: function get() {
                return _this.parent;
            },
            set: function set(val) {
                _this.parent = val;
                return _this.parent;
            }
        });

        Object.defineProperty(this.model, 'style', {
            get: function get() {
                updateStyles(_this.style, _this.$styleNode, _this.id);
                return _this.style;
            },
            set: function set(val) {
                Object.assign(_this.style, val);
                updateStyles(_this.style, _this.$styleNode, _this.id);
                return _this.style;
            }
        });

        if ($node.attributes) {
            var _loop = function _loop(i) {
                var attrName = _utils2.default.dashToCamelCase($node.attributes[i].nodeName);
                var $attrValue = $node.attributes[i].nodeValue;

                if (!_this[attrName]) {
                    _this[attrName] = $attrValue;

                    Object.defineProperty(_this.model, attrName, {
                        get: function get() {
                            return _this[attrName];
                        },
                        set: function set(val) {
                            if (_this[attrName] !== val) {
                                _this[attrName] = val;

                                ;_utils2.default.debounce(function ($node) {
                                    $node.setAttribute(_utils2.default.camelCaseToDash(attrName), _this[attrName]);
                                })($node);
                            }
                            return _this[attrName];
                        }
                    });
                }
            };

            for (var i = 0; i < $node.attributes.length; i++) {
                _loop(i);
            }
        }

        if ($node.childNodes) {
            for (var i = 0; i < $node.childNodes.length; i++) {
                var $child = $node.childNodes[i];

                if ($child.nodeType === 1) {
                    var child = new Model($child);
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

    _createClass(Model, [{
        key: 'append',
        value: function append($node, methods) {
            var _this2 = this;

            var node = new Model($node);
            node.parent = this.model;

            if (!this.firstChild) {
                this.firstChild = node;
            }

            if (this.lastChild) {
                node.prev = this.lastChild;
                this.lastChild.next = node;
            }

            this.lastChild = node;

            _utils2.default.debounce(function () {
                _this2.$node.appendChild(node.$node);
                _this2.emit('!nodeAdded', { node: node, methods: methods });
            })();

            return node;
        }
    }, {
        key: 'prepend',
        value: function prepend($node, methods) {
            var _this3 = this;

            var node = new Model($node);
            node.parent = this.model;

            if (this.firstChild) {
                node.next = this.firstChild;
                this.firstChild.prev = node;
            }

            this.firstChild = node;

            _utils2.default.debounce(function () {
                _this3.$node.prepend(node.$node);
                _this3.emit('!nodeAdded', { node: node, methods: methods });
            })();

            return node;
        }
    }, {
        key: '$event',
        value: function $event(event, cb, useCapture) {
            var _this4 = this;

            useCapture = useCapture || false;
            this.$node.addEventListener(event, function (e) {
                return cb.apply(_this4.model, [e]);
            }, useCapture);
        }
    }, {
        key: 'emit',
        value: function emit(event, payload) {
            var bubbles = true;
            payload = payload || this.model;

            if (this.events === undefined) {
                this.events = {};
            }

            if (this.events[event]) {
                for (var i = 0; i < this.events[event].length; i++) {
                    var e = this.events[event][i];

                    e.fn(payload);
                    bubbles = !e.bubbles ? e.bubbles : bubbles;
                }
            }

            if (bubbles && this.parent) {
                this.parent.emit(event, payload);
            }
        }
    }, {
        key: 'find',
        value: function find(attrName, value, cb) {
            var result = [];

            attrName = _utils2.default.dashToCamelCase(attrName);

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
    }, {
        key: 'findParent',
        value: function findParent(attrName, value, cb) {
            var result = [];
            attrName = _utils2.default.dashToCamelCase(attrName);

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
    }, {
        key: 'on',
        value: function on(event, fn) {
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
    }]);

    return Model;
}();

exports.default = Model;
module.exports = exports['default'];

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    id: 0,
    prefix: 'vnom-',
    head: null,
    camelCaseToDash: function camelCaseToDash(myStr) {
        return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },
    dashToCamelCase: function dashToCamelCase(myString) {
        return myString.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase();
        });
    },
    createStyleNode: function createStyleNode() {
        var styleNode = document.createElement('style');

        styleNode.type = 'text/css';

        return styleNode;
    },
    uid: function uid() {
        return this.prefix + this.id++;
    },
    debounce: function debounce(func) {
        var frame = null;

        return function executedFunction() {
            var context = this;
            var args = arguments;

            if (frame !== null) window.cancelAnimationFrame(frame);

            frame = window.requestAnimationFrame(function () {
                func.apply(context, args);
            });
        };
    }
};
module.exports = exports['default'];

/***/ })

/******/ });
});
//# sourceMappingURL=main.js.map