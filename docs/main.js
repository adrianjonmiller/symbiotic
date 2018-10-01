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
        'body': function body() {
            this.extend({
                something: function something() {
                    return 'test';
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

      if (watcher) {
        watcher(newVal, oldVal);
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

var Symbiote = function () {
    function Symbiote(config) {
        _classCallCheck(this, Symbiote);

        _global2.default.data = config.data || {};
        _global2.default.methods = config.methods || {};
        _global2.default.plugins = config.plugins || [];
    }

    _createClass(Symbiote, [{
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
        this.watchers = {};

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

        _global2.default.vdom[this.id] = {
            tagName: this.tagName,
            id: this.id,
            show: this.show,
            nodeType: $node.nodeType
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
                _this.updateStyles(_this.style, _this.$styleNode, _this.id);
                return _this.style;
            },
            set: function set(val) {
                Object.assign(_this.style, val);
                _this.updateStyles(_this.style, _this.$styleNode, _this.id);
                return _this.style;
            }
        });

        _utils2.default.check($node.attributes, function (attributes) {
            return _utils2.default.loop(attributes, function (attribute) {
                var attrName = _utils2.default.dashToCamelCase(attribute.nodeName);
                var $attrValue = attribute.nodeValue;

                if (!_this[attrName] && attrName !== 'id' && attrName !== 'for') {
                    _this[attrName] = $attrValue;

                    Object.defineProperty(_this.model, attrName, {
                        get: function get() {
                            return _this[attrName];
                        },
                        set: function set(val) {
                            if (_this[attrName] !== val) {
                                _this[attrName] = val;

                                ;_utils2.default.debounce(function ($node) {
                                    $node.setAttribute(_utils2.default.camelCaseToDash(attrName), root[attrName]);
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
                    } else {
                        _this.lastChild.next = child;
                        child.prev = _this.lastChild;
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
                _utils2.default.init(node, methods);
            })();

            return node;
        }
    }, {
        key: '$event',
        value: function $event(event, cb, useCapture) {
            var _this3 = this;

            useCapture = useCapture || false;
            this.$node.addEventListener(event, function (e) {
                return cb.apply(_this3.model, [e]);
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
        key: 'watch',
        value: function watch(watchers) {
            Object.assign(this.watchers, watchers);
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
            var bubbles = event[1] !== 'prevent';

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
          console.log(val);
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