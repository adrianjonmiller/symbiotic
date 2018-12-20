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

function request(body, cb) {
    fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + '30d8c651eebea64a994dcba84ddd9d'
        },
        body: JSON.stringify(body)
    }).then(function (res) {
        return res.json();
    }).then(function (res) {
        cb(null, res.data);
    }).catch(function (err) {
        cb(err);
    });
}

new _index2.default({
    methods: {
        '.test': function test() {
            this.on('UPLOAD', function (item) {
                item.state = 'loading';
                setTimeout(function () {
                    item.state = 'success';
                }, 3000);
            });
        },
        '.link-test': function linkTest() {
            var _this = this;

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
                },
                loading: {
                    style: {
                        color: 'orange'
                    }
                },
                success: {
                    style: {
                        color: 'green'
                    }
                }
            };

            this.$event('click', function (e) {
                _this.emit('UPLOAD');
            });
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
            var _this2 = this;

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
                switch (_this2.state) {
                    case 'start':
                        _this2.emit('SUBMIT');
                        break;

                    case 'loading':
                        _this2.emit("RESOLVE");
                        break;

                    case 'success':
                        _this2.emit('SUBMIT');
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
        '.js-image': function jsImage() {
            return this;
        },
        '#test': function test() {
            var _this3 = this;

            this.extend({
                items: []
            });

            var body = {
                query: '{\n                    allAbsolutes() {\n                        className\n                        description\n                        thumbnail {\n                        url\n                        }\n                    }\n                    }'
            };

            request(body, function (err, res) {
                if (err) {
                    throw err;
                }

                console.log(res);

                _this3.items = res.allAbsolutes;
            });
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

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["default"] = (index);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


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

var _resizeObserverPolyfill = __webpack_require__(/*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

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
                if (_this.state !== state) {
                    _this.state = state;
                    _this.update();
                }
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
                    _utils2.default.check(vals, function (nodes) {
                        _this.updateTextNodes(nodes, key);
                    });
                },
                get: function get() {
                    _utils2.default.check(_this[data], function (nodes) {
                        _this.updateTextNodes(nodes, key);
                    });

                    return _this[data];
                }
            });
        }

        new _resizeObserverPolyfill2.default(function (entries, observer) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var entry = _step.value;
                    var _entry$contentRect = entry.contentRect,
                        left = _entry$contentRect.left,
                        top = _entry$contentRect.top,
                        width = _entry$contentRect.width,
                        height = _entry$contentRect.height;

                    _this.width = width;
                    _this.height = height;
                    _this.top = top;
                    _this.left = left;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }).observe(this.$node);

        if (_global2.default.plugins !== null) {
            this.plugins(_global2.default.plugins);
        }

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