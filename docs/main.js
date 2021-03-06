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

var _test = __webpack_require__(/*! Plugins/test */ "./plugins/test.js");

var _test2 = _interopRequireDefault(_test);

var _plugin = __webpack_require__(/*! ./plugin */ "./docs/plugin.js");

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _index2.default({
    methods: {
        '.link-test': function linkTest() {
            this.states = {
                start: {
                    href: function href(_href) {
                        return _href;
                    },
                    on: {
                        hover: {
                            href: function href(_href2) {
                                return _href2 + '/directory';
                            }
                        }
                    }
                }
            };
        },
        '.js-test': function jsTest() {
            this.class = 'test';
        },
        'body': function body() {
            this.extend({
                something: function something() {
                    return 'test';
                }
            });
        },
        '.event-test': function eventTest() {
            var _this = this;

            this.states = {
                start: {
                    on: {
                        SUBMIT: 'loading',
                        hover: {
                            style: {
                                backgroundColor: 'yellow',
                                color: 'black'
                            }
                        }
                    },
                    style: {
                        backgroundColor: 'blue',
                        color: 'white',
                        outline: 'none',
                        padding: '.5rem 1rem',
                        borderRadius: '.5rem',
                        lineHeight: '1em',
                        border: 'none'
                    },
                    class: function _class(baseclass) {
                        return 'ready ' + baseclass;
                    },
                    text: 'Click me'
                },
                loading: {
                    on: {
                        REJECT: 'error',
                        RESOLVE: 'success'
                    },
                    style: {
                        backgroundColor: 'gray'
                    },
                    class: function _class(currentClass) {
                        console.log(currentClass);
                        return 'loading ' + currentClass;
                    },
                    text: 'Clicked'
                },
                error: {
                    on: {
                        SUBMIT: 'loading'
                    }
                },
                success: {
                    on: {
                        SUBMIT: 'start'
                    },
                    style: {
                        backgroundColor: 'green'
                    },
                    text: "Success!"
                }
            };

            this.$event('click', function (e) {
                switch (_this.state) {
                    case 'start':
                        _this.emit('SUBMIT');
                        break;

                    case 'loading':
                        _this.emit("RESOLVE");
                        break;

                    case 'success':
                        _this.emit('SUBMIT');
                        break;
                }
            });
        },
        '#main': function main() {
            this.success = 'awesome';
            this.success = 'awesome1';
            this.success = 'awesome2';
            this.success = 'awesome3';
        },
        '#todo': function todo() {
            var data = [{
                name: 'Bill',
                sex: "Male",
                shower: 'No'
            }, {
                name: 'Bill',
                sex: "Male",
                shower: 'No'
            }];

            this.extend({
                name: 'Bill'
            });

            this.watch({
                name: function name(newVal, oldVal) {
                    console.log(newVal, oldVal);
                }
            });

            this.name = 'test';

            console.log(this.name);

            var item = {
                name: 'Bill',
                sex: "Male",
                shower: 'No'
            };

            this.plugins([_plugin2.default]);

            this.extend({
                data: 'data'
            });
        },
        '.js-item': function jsItem() {},
        '#test': function test() {
            this.success = [{ item: 'soemthing' }, { item: 'something 2' }];

            // this.success[1].item = 'something 3';
            this.success.push({ item: 'something 4' });
            this.success.push({ item: 'something 5' });
        }
    },
    plugins: [_test2.default],
    data: {
        name: 'some data',
        something: {
            test: 'awesome'
        }
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

/***/ "./docs/plugin.js":
/*!************************!*\
  !*** ./docs/plugin.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(model) {
  // console.log(model);

  _classCallCheck(this, _class);
};

exports.default = _class;
module.exports = exports["default"];

/***/ }),

/***/ "./plugins/test.js":
/*!*************************!*\
  !*** ./plugins/test.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(model) {
  _classCallCheck(this, _class);

  model.somethingX = 'this';
};

exports.default = _class;
module.exports = exports['default'];

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
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

var Data = function () {
  function Data(data, cb) {
    _classCallCheck(this, Data);

    this.method = null;
    this.data = data;
    this.cb = cb;

    if (typeof data === 'function') {
      this.method = data;
      this.data = data();
    }
  }

  _createClass(Data, [{
    key: 'get',
    value: function get() {
      return this.data;
    }
  }, {
    key: 'set',
    value: function set(val) {
      var newVal = void 0;
      var oldVal = this.data;
      var watcher = this.cb();

      if (this.method) {
        newVal = this.method(val);
      } else {
        newVal = val;
      }

      if (newVal === oldVal) {
        return;
      }

      this.data = newVal;

      if (watcher) {
        _utils2.default.debounce(function () {
          watcher(newVal, oldVal);
        })();
      }
    }
  }]);

  return Data;
}();

exports.default = Data;
module.exports = exports['default'];

/***/ }),

/***/ "./src/global.js":
/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  plugins: null,
  head: null,
  vdom: {}
};
module.exports = exports['default'];

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

var _model = __webpack_require__(/*! ./model */ "./src/model.js");

var _model2 = _interopRequireDefault(_model);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _global = __webpack_require__(/*! ./global */ "./src/global.js");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Symbiotic = function () {
    function Symbiotic(config) {
        _classCallCheck(this, Symbiotic);

        _global2.default.data = config.data || {};
        _global2.default.methods = config.methods || {};
        _global2.default.plugins = config.plugins || [];
    }

    _createClass(Symbiotic, [{
        key: 'attach',
        value: function attach(el) {
            var _this = this;

            var $scope = _utils2.default.getScope(el);
            _global2.default.head = _utils2.default.findHead($scope);

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
                _this.vnom = new _model2.default($scope, _global2.default.data);

                _utils2.default.init(_this.vnom);

                var t1 = performance.now();
                console.log('Symbiote attached in ' + (t1 - t0) + ' milliseconds.');
            });
        }
    }]);

    return Symbiotic;
}();

exports.default = Symbiotic;


if (window && window.Symbiotic === undefined) {
    window.Symbiotic = Symbiotic;
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _global = __webpack_require__(/*! ./global */ "./src/global.js");

var _global2 = _interopRequireDefault(_global);

var _observe = __webpack_require__(/*! ./observe */ "./src/observe.js");

var _observe2 = _interopRequireDefault(_observe);

var _data = __webpack_require__(/*! ./data */ "./src/data.js");

var _data2 = _interopRequireDefault(_data);

var _textNode = __webpack_require__(/*! ./textNode */ "./src/textNode.js");

var _textNode2 = _interopRequireDefault(_textNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
    function Model($node) {
        var _this = this;

        _classCallCheck(this, Model);

        var hover = false;

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
        this.show = true;
        this.textNodes = [];
        this.width = $node.offsetWidth;
        this.height = $node.offsetHeight;
        this.state = 'start';
        this.hover = false;
        this.prevState = '';
        this.states = {};
        this.watchers = {};

        _global2.default.vdom[this.id] = {
            tagName: this.tagName,
            id: this.id,
            show: this.show,
            nodeType: $node.nodeType
        };

        this.model = {
            $node: $node,
            $event: this.$event.bind(this),
            textNodes: this.textNodes,
            on: this.on.bind(this),
            emit: this.emit.bind(this),
            append: this.append.bind(this),
            prepend: this.prepend.bind(this),
            find: this.find.bind(this),
            findParent: this.findParent.bind(this),
            render: this.render.bind(this),
            plugins: this.plugins.bind(this),
            extend: this.extend.bind(this),
            watch: this.watch.bind(this)
        };

        if (this.id !== $node.getAttribute('id')) {
            $node.setAttribute('id', this.id);
        }

        if (this.tagName === 'template') {
            this.template = _utils2.default.getTemplateNode($node);
            this.model.template = this.template;
        }

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

        Object.defineProperty(this, 'hover', {
            get: function get() {
                return hover;
                _this.update();
            },
            set: function set(val) {
                hover = val;
                _this.update();
            }
        });

        Object.defineProperty(this.model, 'states', {
            get: function get() {
                return _this.states;
            },
            set: function set(states) {
                _this.states = states;
                _this.update();
            }
        });

        Object.defineProperty(this.model, 'state', {
            get: function get() {
                return _this.state;
            },
            set: function set(state) {
                _this.state = state;
            }
        });

        Object.defineProperty(this.model, 'style', {
            get: function get() {
                _this.updateStyles(_this.style, _this.$styleNode, _this.id);
                return _this.style;
            },
            set: function set(val) {
                Object.assign(_this.style, val);
                _this.updateStyles(_this.style, _this.$styleNode, _this.id);
                return _this.style;
            }
        });

        if ($node.tagName === 'input') {
            Object.defineProperty(this.model, 'value', {
                get: function get() {
                    return _this.$node.value;
                },
                set: function set(val) {
                    _this.$node.value = val;
                }
            });
        }

        this.$node.addEventListener('mouseover', function () {
            _this.update('hover');
        });

        this.$node.addEventListener('mouseout', function () {
            _this.update();
        });

        _utils2.default.check($node.attributes, function (attributes) {
            return _utils2.default.loop(attributes, function (attribute) {
                var attrName = _utils2.default.dashToCamelCase(attribute.nodeName);
                var $attrValue = attribute.nodeValue;

                if (!_this[attrName] && attrName !== 'id' && attrName !== 'for') {
                    _this[attrName] = $attrValue;
                    _global2.default.vdom[_this.id][attrName] = $attrValue;

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
                        }
                    });
                }
            });
        });

        _utils2.default.check($node.childNodes, function ($children) {
            return _utils2.default.loop($children, function ($child) {
                if ($child.nodeType === 1) {
                    var child = new Model($child);
                    child.parent = _this.model;

                    if (!_this.lastChild) {
                        _this.firstChild = child;
                        _this.model.child = child;
                        _global2.default.vdom[_this.id].child = child.id;
                    } else {
                        _this.lastChild.next = child;
                        child.prev = _this.lastChild;
                        _global2.default.vdom[_this.lastChild.id].next = child.id;
                    }
                    _this.lastChild = child;
                }

                _utils2.default.getTextNode($child, function ($textNode) {
                    _this.textNodes.push(new _textNode2.default($textNode, _this.model));
                });
            });
        });

        if ($node.getAttribute('for')) {
            var list = $node.getAttribute('for').split(' in ');
            var key = list[0];
            var data = list[1];
            this.cloned = {};

            Object.defineProperty(this.model, data, {
                set: function set(vals) {
                    _this[data] = vals;
                    _this.updateTextNodes(vals, key);
                },
                get: function get() {
                    _this.updateTextNodes(_this[data], key);
                    return _this[data];
                }
            });
        }

        if (_global2.default.plugins !== null) {
            this.plugins(_global2.default.plugins);
        }

        console.log(_global2.default.vdom);

        return this.model;
    }

    _createClass(Model, [{
        key: '$event',
        value: function $event(event, cb, useCapture) {
            var _this2 = this;

            useCapture = useCapture || false;
            this.$node.addEventListener(event, function (e) {
                return cb.apply(_this2.model, [e]);
            }, useCapture);
        }
    }, {
        key: 'append',
        value: function append($node, methods) {
            var _this3 = this;

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
                _this3.$node.appendChild(node.$node);
                _utils2.default.init(node, methods);
            })();

            return node;
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

            this.update(event);

            if (bubbles && this.parent) {
                this.parent.emit(event, payload);
            }
        }
    }, {
        key: 'extend',
        value: function extend(data) {
            var ctx = this;(function loop(model, data) {
                _utils2.default.check(data, function (data) {
                    return _utils2.default.loop(data, function (value, key) {
                        if (model[key] !== undefined) {
                            throw 'Key on model cannot be redefined';
                        }

                        var Proxy = new _data2.default(value, function () {
                            return ctx.watchers[key] || null;
                        });

                        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                            model[key] = model[key] || {};
                            loop(model[key], value);
                        } else {
                            Object.defineProperty(model, key, {
                                get: function get() {
                                    return Proxy.get();
                                },
                                set: function set(val) {
                                    Proxy.set(val);
                                },
                                configurable: true
                            });
                        }
                    });
                });
            })(this.model, data);
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
            var bubbles = event[1] !== 'stop';

            if (this.events === undefined) {
                this.events = {};
            }

            if (this.events[name] === undefined) {
                this.events[name] = [];
            }

            this.events[name].push({ fn: fn, bubbles: bubbles });
        }
    }, {
        key: 'plugins',
        value: function plugins(Plugins) {
            var _this4 = this;

            if (!Plugins.length > 0) {
                return null;
            }

            _utils2.default.check(Plugins, function () {
                return _utils2.default.loop(Plugins, function (Plugin) {
                    new Plugin(_this4.model);
                });
            });
        }
    }, {
        key: 'prepend',
        value: function prepend($node, methods) {
            var _this5 = this;

            var node = new Model($node);
            node.parent = this.model;

            if (this.firstChild) {
                node.next = this.firstChild;
                this.firstChild.prev = node;
            }

            this.firstChild = node;

            _utils2.default.debounce(function () {
                _this5.$node.prepend(node.$node);
                _utils2.default.init(node, methods);
            })();

            return node;
        }
    }, {
        key: 'render',
        value: function render(args) {
            var _this6 = this;

            if (!args.template && this.tagName !== 'template') {
                return;
            }

            var template = args.template || this.template;
            var data = args.data || {};
            var methods = args.methods || _global2.default.methods;
            var refs = template.match(/{{{?(#[a-z ]+ )?[a-z ]+.[a-z ]*}?}}/g);
            var range = document.createRange();

            _utils2.default.check(refs, function (refs) {
                return _utils2.default.loop(refs, function (ref) {
                    var key = ref.replace(/{{|}}/g, '').trim();
                    var value = _utils2.default.stringRef(key, data);

                    template = template.replace(ref, value);
                });
            });

            var frag = range.createContextualFragment(template);

            return _utils2.default.check(frag.children, function ($children) {
                return _utils2.default.loop($children, function ($child) {
                    if (_this6.tagName === 'template') {
                        if (_this6.parent !== undefined) {
                            return _this6.parent.append($child, methods);
                        }
                    } else {
                        return _this6.append($child, methods);
                    }
                });
            });
        }
    }, {
        key: 'update',
        value: function update(event) {
            event = event || null;
            var state = null;
            var next = null;
            var ctx = this;

            if (!(this.state in this.states)) {
                return;
            }

            state = this.states[this.state];

            if (!event) {
                update(state);
                return;
            }

            if (state.on === undefined) {
                return;
            }

            if (!(event in state.on)) {
                return;
            }

            if (typeof state.on[event] === 'string') {
                this.state = state.on[event];
                next = this.states[this.state];
            }

            if (_typeof(state.on[event]) === 'object') {
                next = state.on[event];
            }

            update(next);

            function update(values) {
                _utils2.default.loop(values, function (value, key) {
                    if (key !== 'on') {
                        if (typeof value === 'function') {
                            ctx.model[key] = value(_global2.default.vdom[ctx.id][key]);
                        } else {
                            ctx.model[key] = value;
                        }
                    }
                });
            }
        }
    }, {
        key: 'updateStyles',
        value: function updateStyles() {
            var _this7 = this;

            _utils2.default.debounce(function () {
                if (!_utils2.default.check(_this7.style)) {
                    _this7.$styleNode.innerHTML = '';
                    return;
                }

                var styleString = '#' + _this7.id + '{';

                _utils2.default.loop(_this7.style, function (value, prop) {
                    styleString += _utils2.default.camelCaseToDash(prop) + ':' + value + ';';
                });

                styleString += '}';

                if (_this7.$styleNode.parentNode === null) {
                    _global2.default.head.appendChild(_this7.$styleNode);
                }

                _this7.$styleNode.innerHTML = styleString;
            })();
        }
    }, {
        key: 'updateTextNodes',
        value: function updateTextNodes(vals, key) {
            var _this8 = this;

            _utils2.default.debounce(function () {
                _utils2.default.loop(vals, function (val, k) {
                    if (_this8.cloned[k] === undefined) {
                        var $clonedNode = _this8.$node.content.children[0].cloneNode(true);
                        _this8.cloned[k] = _this8.parent.append($clonedNode);
                    }

                    if (_this8.cloned[k].data && _this8.cloned[k].data === key) {
                        _this8.cloned[k][key] = val;

                        _this8.cloned[k].textNodes.forEach(function (textNode) {
                            textNode.update();
                        });
                    }

                    _this8.cloned[k].find('data', key, function (found) {
                        found[key] = val;

                        found.textNodes.forEach(function (textNode) {
                            textNode.update();
                        });
                    });
                });
            })();
        }
    }, {
        key: 'watch',
        value: function watch(watchers) {
            Object.assign(this.watchers, watchers);
        }
    }]);

    return Model;
}();

exports.default = Model;
module.exports = exports['default'];

/***/ }),

/***/ "./src/observe.js":
/*!************************!*\
  !*** ./src/observe.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(object, watchers) {
	_classCallCheck(this, _class);

	var context = this;
	context.watchers = watchers || [];

	var handler = {
		get: function get(target, property, receiver) {
			try {
				return new Proxy(target[property], handler);
			} catch (err) {
				return Reflect.get(target, property, receiver);
			}
		},
		defineProperty: function defineProperty(target, property, descriptor) {
			context.watchers.forEach(function (watcher) {
				watcher.call(null, target, property, descriptor);
			});
			return Reflect.defineProperty(target, property, descriptor);
		},
		deleteProperty: function deleteProperty(target, property) {
			context.watchers.forEach(function (watcher) {
				watcher.call(null, target, property, descriptor);
			});
			return Reflect.deleteProperty(target, property);
		}
	};

	return new Proxy(object, handler);
};

exports.default = _class;
module.exports = exports['default'];

/***/ }),

/***/ "./src/textNode.js":
/*!*************************!*\
  !*** ./src/textNode.js ***!
  \*************************/
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

var _class = function () {
  function _class($node, model) {
    var _this = this;

    _classCallCheck(this, _class);

    this.$node = $node;
    this.originalContent = $node.textContent;
    this.keys = [];
    this.model = model;
    this.data = {};

    this.replace(function (variable) {
      Object.defineProperty(model, variable, {
        get: function get() {
          return _this.data[variable];
        },
        set: function set(val) {
          _this.data[variable] = val;_utils2.default.debounce(function () {
            _this.update();
          })();
        }
      });
      _this.keys.push(variable);
      return _utils2.default.stringRef(variable, model);
    });
  }

  _createClass(_class, [{
    key: 'replace',
    value: function replace(cb) {
      this.$node.textContent = this.originalContent.replace(_utils2.default.mustacheRegex, function (match, variable) {
        return cb(variable);
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      this.replace(function (variable) {
        return _utils2.default.stringRef(variable, _this2.model);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _model = __webpack_require__(/*! ./model */ "./src/model.js");

var _model2 = _interopRequireDefault(_model);

var _global = __webpack_require__(/*! ./global */ "./src/global.js");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    id: 0,
    prefix: 'vnom-',
    mustacheRegex: /\$\{\s?(\w.+)\s?\}/g,
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
    },
    isNode: function isNode(o) {
        return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === "object" ? o instanceof Node : o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
    },
    check: function check(item, cb) {
        if (item === null) {
            return false;
        }

        if (item === undefined) {
            return false;
        }

        switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
            case 'array':
                if (item.length === 0) {
                    return false;
                }
                break;
            case 'object':
                if (!this.isNode(item)) {
                    if (Object.keys(item).length === 0) {
                        return false;
                    }
                }
                break;
            case 'string':
                if (item === '') {
                    return false;
                }
                break;
        }

        if (typeof cb === 'function') {
            return cb.apply(null, [item]);
        }

        return true;
    },
    loop: function loop(object, cb) {
        var length = object.length;
        var result = [];

        if (length > 0) {
            for (var i = 0; i < length; i++) {
                var res = cb.apply(null, [object[i], i, length]);
                if (res) {
                    result.push(res);
                }
            }
        } else {
            for (var key in object) {
                var _res = cb.apply(null, [object[key], key]);
                if (_res) {
                    result.push();
                }
            }
        }
        return result;
    },
    getTextNode: function getTextNode($child, cb) {
        if ($child.nodeType === 3) {
            if ($child.nodeValue.trim().length > 0) {
                return cb($child);
            }
        }
    },
    getTemplateNode: function getTemplateNode($node, cb) {
        if ($node.tagName === 'TEMPLATE') {
            if (typeof cb === 'function') {
                return cb.apply(null, [$node.innerHTML]);
            }
            return $node.innerHTML;
        }
    },
    stringRef: function stringRef(ref, object) {
        return ref.split('.').reduce(function (object, i) {
            if (object[i]) {
                return object[i];
            } else {
                return '';
            }
        }, object);
    },
    init: function init(vnom, methods) {
        methods = methods || _global2.default.methods;

        if (typeof methods === 'function') {
            methods.apply(vnom);
            return;
        }

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
    },
    getScope: function getScope(el) {
        if (el === undefined) {
            return document.body || document.querySelector('body');
        }

        switch (typeof el === 'undefined' ? 'undefined' : _typeof(el)) {
            case 'string':
                return document.querySelector(el);
            case 'object':
                return el;
        }
    },
    findHead: function findHead($node) {
        if ($node.tagName === 'HTML') {
            return $node.querySelector('head');
        } else {
            return this.findHead($node.parentNode);
        }
    }
};
module.exports = exports['default'];

/***/ })

/******/ });
});
//# sourceMappingURL=main.js.map