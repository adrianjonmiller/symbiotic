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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/promise-polyfill/src/finally.js":
/*!******************************************************!*\
  !*** ./node_modules/promise-polyfill/src/finally.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
}

/* harmony default export */ __webpack_exports__["default"] = (finallyConstructor);


/***/ }),

/***/ "./node_modules/promise-polyfill/src/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/src/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony import */ var _finally__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./finally */ "./node_modules/promise-polyfill/src/finally.js");


// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = _finally__WEBPACK_IMPORTED_MODULE_0__["default"];

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Promise);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

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

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/template-polyfill/index.js":
/*!*************************************************!*\
  !*** ./node_modules/template-polyfill/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function templatePolyfill() {
  if ('content' in document.createElement('template')) {
    return false;
  }

  var templates = document.getElementsByTagName('template');
  var plateLen = templates.length;

  for (var x = 0; x < plateLen; ++x) {
    var template = templates[x];
    var content = template.childNodes;
    var fragment = document.createDocumentFragment();

    while (content[0]) {
      fragment.appendChild(content[0]);
    }

    template.content = fragment;
  }
}

module.exports = templatePolyfill;


/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

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

/***/ "./src/after-polyfill.js":
/*!*******************************!*\
  !*** ./src/after-polyfill.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('after')) {
      return;
    }
    Object.defineProperty(item, 'after', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function after() {
        var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.parentNode.insertBefore(docFrag, this.nextSibling);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

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

    this.data = data;
    this.cb = cb;
    this.watchers = [];
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

      if (newVal === oldVal) {
        return;
      }

      this.data = newVal;

      if (watcher) {
        _utils2.default.nextFrame(function () {
          return watcher(newVal, oldVal);
        });
      }
    }
  }]);

  return Data;
}();

exports.default = Data;
module.exports = exports['default'];

/***/ }),

/***/ "./src/descriptor.js":
/*!***************************!*\
  !*** ./src/descriptor.js ***!
  \***************************/
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Descriptor = function () {
  function Descriptor(value, node) {
    var _this = this;

    _classCallCheck(this, Descriptor);

    this.watchers = [];
    this.value = null;
    this.computer = null;
    this.node = node || null;

    if (value === null) {
      this.value = null;
    } else {
      switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'function':
          this.computer = value;
          this.value = null;
          break;

        case 'object':
          if ('$node' in value) {
            this.computer = value;
            this.value = null;
            break;
          }

          if (value instanceof Element) {
            this.value = value;
            break;
          }

          if ('watcher' in value) {
            this.addWatcher(value.watcher);
          }

          if ('value' in value) {
            if (typeof value.value === 'function') {
              this.computer = value.value;
              this.value = null;
            } else {
              this.value = value.value;
            }
            break;
          }

          if (this.value === null) {
            this.value = {};
          }

          _utils2.default.loop(value, function (val, key) {
            Object.defineProperty(_this.value, key, new Descriptor(val, _this.node));
          });
          break;

        default:
          this.value = value;
          break;
      }
    }

    return {
      get: function get() {
        if (_this.computer) {
          return _this.computer.call(_this, _this.value);
        }
        return _this.value;
      },
      set: function set(value) {
        if (_this.value === value) {
          return;
        }

        if (_this.computer) {
          _this.value = _this.computer.call(_this, value);
          _this.update();
          return;
        }

        if (value === null) {
          _this.value = value;
          _this.update();
          return;
        }

        if (value instanceof Element) {
          _this.value = value;
          _this.update();
          return;
        }

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          if ('$node' in value) {
            _this.value = value;
            _this.update();
            return;
          }

          if ('watcher' in value) {
            _this.addWatcher(value.watcher);
            if (!('value' in value)) return;
          }

          if ('value' in value) {
            _this.value = value.value;
            _this.update();
            return;
          }

          _utils2.default.loop(value, function (val, key) {
            if (_this.value === null) {
              _this.value = {};
            }

            if (key in _this.value) {
              _this.value[key] = val;
            } else {
              Object.defineProperty(_this.value, key, new Descriptor(val));
            }
          });
        }

        _this.value = value;
        _this.update();
      },
      writeable: true,
      enumerable: true,
      configurable: false
    };
  }

  _createClass(Descriptor, [{
    key: 'update',
    value: function update() {
      var _this2 = this;

      this.watchers.forEach(function (watcher) {
        if (typeof _this2.value === 'function') {
          watcher(_this2.value());
        } else {
          watcher(_this2.value);
        }
      });
    }
  }, {
    key: 'addWatcher',
    value: function addWatcher(watcher) {
      var _this3 = this;

      if (Array.isArray(watcher)) {
        this.watchers = this.watchers.concat(watcher.map(function (fn) {
          return fn.bind(_this3.node);
        }));
      }
      if (typeof watcher === 'function') {
        this.watchers.push(watcher.bind(this.node));
      }
    }
  }]);

  return Descriptor;
}();

exports.default = Descriptor;
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


// Polyfills

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// Imports


__webpack_require__(/*! ./after-polyfill */ "./src/after-polyfill.js");

var _templatePolyfill = __webpack_require__(/*! template-polyfill */ "./node_modules/template-polyfill/index.js");

var _templatePolyfill2 = _interopRequireDefault(_templatePolyfill);

var _promisePolyfill = __webpack_require__(/*! promise-polyfill */ "./node_modules/promise-polyfill/src/index.js");

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

var _vnode = __webpack_require__(/*! ./vnode */ "./src/vnode.js");

var _vnode2 = _interopRequireDefault(_vnode);

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
    _global2.default.states = config.states || {};
    _global2.default.plugins = config.plugins || [];
  }

  _createClass(Symbiotic, [{
    key: 'attach',
    value: function attach(el) {
      var $scope = _utils2.default.getScope(el);
      _global2.default.head = _utils2.default.findHead($scope);

      if (!'content' in document.createElement('template')) {
        this.boostrapTemplates(_global2.default.head);
      }

      return new _promisePolyfill2.default(function (resolve, reject) {
        ;(function (start) {
          if (document.readyState !== 'loading') {
            resolve(start());
          } else {
            document.addEventListener('DOMContentLoaded', function () {
              resolve(start());
            });
          }
        })(function () {
          var t0 = performance.now();
          var vnode = new _vnode2.default($scope);

          _utils2.default.init(vnode);

          var t1 = performance.now();
          console.log('Symbiote attached in ' + (t1 - t0) + ' milliseconds.');
          return vnode;
        });
      });
    }
  }, {
    key: 'boostrapTemplates',
    value: function boostrapTemplates(head) {
      var polyfillStyle = _utils2.default.createStyleNode();
      var polyfillScript = document.createElement('script');
      polyfillScript.innerText = 'document.createElement("template")';
      polyfillStyle.innerHTML = 'template { display: none !important};';
      head.appendChild(polyfillStyle);
      head.appendChild(polyfillScript);
      (0, _templatePolyfill2.default)();
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    this.cloned = {};
    this.$node = $node;
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
      // render: this.render.bind(this),
      plugins: this.plugins.bind(this),
      extend: this.extend.bind(this),
      watch: this.watch.bind(this)
    };

    if (this.id !== $node.getAttribute('id')) {
      $node.setAttribute('id', this.id);
    }

    Object.defineProperty(this.model, 'id', {
      get: function get() {
        return _this.id;
      }
    });

    if ($node.tagName) {
      this.tagName = $node.tagName.toLowerCase();

      Object.defineProperty(this.model, 'tagName', {
        get: function get() {
          return _this.tagName;
        }
      });
    }

    if (this.tagName === 'template') {
      this.$template = _utils2.default.getTemplateNode($node);
      this.model.$template = this.$template;
    }

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
        _this.updateState();
      }
    });

    Object.defineProperty(this.model, 'state', {
      get: function get() {
        return _this.state;
      },
      set: function set(state) {
        if (_this.state !== state) {
          _this.state = state;
          _this.updateState();
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
      _this.updateState('hover');
    });

    this.$node.addEventListener('mouseout', function () {
      _this.updateState();
    });

    _utils2.default.check($node.attributes, function (attributes) {
      return _utils2.default.loop(attributes, function (attribute) {
        var attrName = _utils2.default.dashToCamelCase(attribute.nodeName);
        var $attrValue = attribute.nodeValue;

        if (!_this[attrName] && attrName !== 'id' && attrName !== 'for') {
          _this[attrName] = $attrValue;
          _global2.default.vdom[_this.id][attrName] = $attrValue;

          if (~$attrValue.indexOf('${')) {
            $attrValue.replace(_utils2.default.mustacheRegex, function (match, variable) {

              var refs = variable.split('.');

              (function loop(obj, store, refs, index) {
                var key = refs[index];
                if (index < refs.length - 1) {
                  obj[key] = {};
                  store[key] = {};
                  index++;
                  loop(obj[key], store[key], refs, index);
                } else {
                  store[key] = $attrValue;
                  Object.defineProperty(obj, key, {
                    get: function get() {
                      return store[key];
                    },
                    set: function set(val) {
                      ;_utils2.default.debounce(function ($node) {
                        $node.setAttribute(_utils2.default.camelCaseToDash(attrName), store[key].replace(match, val));
                      })($node);
                    }
                  });
                }
              })(_this.model, _this, refs, 0);
            });
          } else {
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
          _utils2.default.check(vals, function (vals) {
            _this.cloneNodes(vals, key);
          });
        },
        get: function get() {
          return _this[data];
        }
      });
    }

    new ResizeObserver(function (entries, observer) {
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

          console.log(left, top, width, height);
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

    var pos = ['top', 'left', 'width', 'height'];

    pos.forEach(function (p) {
      Object.defineProperty(_this.model, p, {
        get: function get() {
          return _this[p];
        },
        set: function set(val) {
          _this.style[p] = val;
        }
      });
    });

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
    key: 'cloneNodes',
    value: function cloneNodes(vals, key) {
      var _this4 = this;

      _utils2.default.debounce(function () {
        _utils2.default.loop(vals, function (val, k) {
          var $cloned = _this4.$template.children[0].cloneNode(true);
          var cloned = _this4.parent.append($cloned);

          if (cloned.data === key) {
            _this4.cloned[key].extend(val);
            _this4.cloned[key].textNodes.forEach(function (textNode) {
              textNode.update();
            });
          }

          cloned.find(key, function (node) {
            (function loop(node, data) {

              _utils2.default.loop(data, function (v, k) {
                if (k in node) {
                  if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) !== 'object') {
                    node[k] = v;
                  } else {
                    loop(node[k], v);
                  }
                } else {
                  if (typeof node.extend === 'function') {
                    node.extend(_defineProperty({}, k, v));
                  }
                }
              });
            })(node[key], val);
          });
        });
      })();
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

      this.updateState(event);

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

            if (typeof value === 'function') {
              var _Proxy = new _data2.default(value.bind(model), function () {
                return ctx.watchers[key] || null;
              });

              Object.defineProperty(model, key, {
                get: function get() {
                  return _Proxy.get();
                },
                configurable: true
              });
            } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
              model[key] = model[key] || {};
              loop(model[key], value);
            } else {
              var _Proxy2 = new _data2.default(value, function () {
                return ctx.watchers[key] || null;
              });

              Object.defineProperty(model, key, {
                get: function get() {
                  return _Proxy2.get();
                },
                set: function set(val) {
                  _Proxy2.set(val);
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
          if (vnode[attrName] !== undefined && typeof value === 'function') {
            value(vnode);
            result.push(vnode);
          } else if (vnode[attrName] !== undefined && vnode[attrName].split(' ').includes(value)) {
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
          if (vnode[attrName] !== undefined && vnode[attrName].split(' ').includes(value)) {
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
      var _this5 = this;

      if (!Plugins.length > 0) {
        return null;
      }

      _utils2.default.check(Plugins, function () {
        return _utils2.default.loop(Plugins, function (Plugin) {
          _this5.extend(new Plugin(_this5));
        });
      });
    }
  }, {
    key: 'prepend',
    value: function prepend($node, methods) {
      var _this6 = this;

      var node = new Model($node);
      node.parent = this.model;

      if (this.firstChild) {
        node.next = this.firstChild;
        this.firstChild.prev = node;
      }

      this.firstChild = node;

      _utils2.default.debounce(function () {
        _this6.$node.prepend(node.$node);
        _utils2.default.init(node, methods);
      })();

      return node;
    }
  }, {
    key: 'render',
    value: function render(args) {
      var _this7 = this;

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
          if (_this7.tagName === 'template') {
            if (_this7.parent !== undefined) {
              return _this7.parent.append($child, methods);
            }
          } else {
            return _this7.append($child, methods);
          }
        });
      });
    }
  }, {
    key: 'updateState',
    value: function updateState(event) {
      event = event || null;
      var state = null;
      var next = null;
      var ctx = this;

      if (!(this.state in this.states)) {
        return;
      }

      state = this.states[this.state];

      if (!event) {
        _update(state);
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

      _update(next);

      function _update(values) {
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
      var _this8 = this;

      _utils2.default.debounce(function () {
        if (!_utils2.default.check(_this8.style)) {
          _this8.$styleNode.innerHTML = '';
          return;
        }

        var styleString = '#' + _this8.id + '{';

        _utils2.default.loop(_this8.style, function (value, prop) {
          styleString += _utils2.default.camelCaseToDash(prop) + ':' + value + ';';
        });

        styleString += '}';

        if (_this8.$styleNode.parentNode === null) {
          _global2.default.head.appendChild(_this8.$styleNode);
        }

        _this8.$styleNode.innerHTML = styleString;
      })();
    }
  }, {
    key: 'updateTextNodes',
    value: function updateTextNodes(vals, key) {
      var _this9 = this;

      _utils2.default.debounce(function () {
        _utils2.default.loop(vals, function (val, k) {
          if (_this9.cloned[k] === undefined) {
            var $clonedNode = _this9.$node.content.children[0].cloneNode(true);
            _this9.cloned[k] = _this9.parent.append($clonedNode);
          }

          if (_this9.cloned[k].data && _this9.cloned[k].data === key) {
            _this9.cloned[k][key] = val;

            _this9.cloned[k].textNodes.forEach(function (textNode) {
              textNode.update();
            });
          }

          _this9.cloned[k].find('data', key, function (found) {
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

    var ctx = this;
    this.$node = $node;
    this.originalContent = $node.textContent;
    this.model = model;
    this.data = {};

    this.replace(function (variable) {
      (function loop(model, refs, index) {
        var key = refs[index];
        if (index < refs.length - 1) {
          model[key] = {};
          index++;
          loop(model[key], refs, index);
        } else {
          Object.defineProperty(model, key, {
            get: function get() {
              return ctx.data;
            },
            set: function set(val) {
              ctx.data = val;_utils2.default.debounce(function () {
                ctx.update();
              })();
            },
            configurable: true
          });
        }
      })(_this.model, variable.split('.'), 0);

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
  mustacheRegex: /\${\s*([\w\.]+)\s*}/g,
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
  nextFrame: function nextFrame(fn) {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    requestAnimationFrame(function () {
      fn();
    });
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
        return cb.apply(null, [$node.content]);
      }
      return $node.content;
    }
  },
  stringRef: function stringRef(ref, object) {
    return ref.split('.').reduce(function (object, i) {
      if (object) {
        if (object[i]) {
          return object[i];
        } else {
          return null;
        }
      }
    }, object);
  },
  init: function init(vnom, states) {
    states = states || _global2.default.states;

    for (var state in states) {
      var attribute = '';
      var attributeValue = '';

      switch (state.charAt(0)) {
        case '.':
          attribute = 'class';
          attributeValue = state.substring(1);
          break;
        case '#':
          attribute = 'id';
          attributeValue = state.substring(1);
          break;
        default:
          attribute = 'tagName';
          attributeValue = state;
      }

      if (attribute in vnom) {
        if (vnom[attribute].split(' ').indexOf(attributeValue) > -1) {
          var obj = states[state];
          vnom.setStates(obj);
        }
      }
    }

    if (vnom.firstChild) {
      this.init(vnom.firstChild, states);
    }

    if (vnom.next) {
      this.init(vnom.next, states);
    }

    vnom.state = 'start';
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

/***/ }),

/***/ "./src/vnode.js":
/*!**********************!*\
  !*** ./src/vnode.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vnom = __webpack_require__(/*! ./vnom */ "./src/vnom.js");

var _vnom2 = _interopRequireDefault(_vnom);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _textNode = __webpack_require__(/*! ./textNode */ "./src/textNode.js");

var _textNode2 = _interopRequireDefault(_textNode);

var _resizeObserverPolyfill = __webpack_require__(/*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _descriptor = __webpack_require__(/*! ./descriptor */ "./src/descriptor.js");

var _descriptor2 = _interopRequireDefault(_descriptor);

var _vtext = __webpack_require__(/*! ./vtext */ "./src/vtext.js");

var _vtext2 = _interopRequireDefault(_vtext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vnode = function () {
  function Vnode($node) {
    var _this = this;

    _classCallCheck(this, Vnode);

    var stateName = null;
    this.states = {};

    Object.defineProperty(this, 'state', {
      get: function get() {
        return stateName;
      },
      set: function set(newStateName) {
        var oldState = _this.getState(stateName);
        var newState = _this.getState(newStateName);
        stateName = newStateName;

        if ('leave' in oldState) {
          oldState.leave.apply(_this);
        }

        if ('enter' in newState) {
          newState.enter.apply(_this);
        }

        if ('props' in newState) {
          _utils2.default.loop(newState.props, function (prop, key) {
            _this[key] = prop;
          });
        }

        if ('on' in newState) {
          _utils2.default.loop(newState.on, function (res, event) {
            var fn = typeof res === 'function' ? res : function () {
              return _this.state = res;
            };
            if (event.charAt(0) === '$') {
              _this.$on(event);
            }
          });
        }

        if ('ready' in newState) {
          newState.ready.apply(_this);
        }
      }
    });

    this.extend(new _vnom2.default($node));

    _utils2.default.check($node.childNodes, function ($children) {
      return _utils2.default.loop($children, function ($child) {
        if ($child.nodeType === 1) {
          var child = new Vnode($child);
          child.parent = _this;

          if (_this.lastChild) {
            _this.lastChild.next = child;
            child.prev = _this.lastChild;
          } else {
            _this.firstChild = child;
          }

          _this.lastChild = child;
        }

        if ($child.nodeType === 3) {
          if ($child.nodeValue.match(_utils2.default.mustacheRegex)) {
            _this.extend(new _vtext2.default($child));
          }
        }
      });
    });
  }

  _createClass(Vnode, [{
    key: 'setStates',
    value: function setStates(newStates) {
      if ('data' in newStates) {
        this.extend(newStates.data);
        delete newStates.data;
      }

      if ('methods' in newStates) {
        for (var methodKey in newStates.methods) {
          this[methodKey] = newStates.methods[methodKey];
        }
        delete newStates.methods;
      }

      this.states = newStates;
    }
  }, {
    key: 'getState',
    value: function getState(state) {
      if (state in this.states) {
        return this.states[state];
      }
      return {};
    }
  }, {
    key: '$on',
    value: function $on(event) {
      var _this2 = this;

      var $event = event.substring(1);
      var useCapture = false;

      this.$node.addEventListener($event, function (e) {
        var state = _this2.getState(_this2.state);

        if ('on' in state) {
          var events = state.on;
          if (event in events) {
            var fn = typeof events[event] === 'function' ? events[event] : function () {
              this.state = events[event];
            };
            fn.call(_this2, e);
          }
        }
      }, useCapture);
    }
  }, {
    key: 'append',
    value: function append($node, states) {
      var _this3 = this;

      var node = new Vnode($node);
      node.parent = this;

      if (!this.firstChild) {
        this.firstChild = node;
      }

      if (this.lastChild) {
        node.prev = this.lastChild;
        this.lastChild.next = node;
      }

      this.lastChild = node;

      _utils2.default.nextFrame(function () {
        _this3.$node.appendChild(node.$node);
        _utils2.default.init(node, states);
      });

      return node;
    }
  }, {
    key: 'emit',
    value: function emit(event, payload) {
      var state = this.getState(this.state);
      var bubbles = true;
      payload = payload || this;

      if ('on' in state) {
        var events = state.on;

        if (event in events) {
          event = event.split('.');
          var _eventName = event[0];
          var fn = events[_eventName];

          bubbles = event[1] !== 'stop';

          fn = typeof fn === 'function' ? fn : function () {
            this.state = events[_eventName];
          };
          fn.apply(this);
        }
      }

      if (bubbles && this.parent) {
        this.parent.emit(eventName, payload);
      }
    }
  }, {
    key: 'extend',
    value: function extend(data) {
      var _this4 = this;

      _utils2.default.check(data, function (data) {
        return _utils2.default.loop(data, function (value, key) {
          if (key in _this4) {
            _this4[key] = value;
          } else {
            Object.defineProperty(_this4, key, new _descriptor2.default(value, _this4));
          }
        });
      });
    }
  }, {
    key: 'find',
    value: function find(attrName, value, cb) {
      var result = [];

      attrName = utils.dashToCamelCase(attrName);

      (function dig(vnode) {
        if (vnode) {
          if (vnode[attrName] !== undefined && typeof value === 'function') {
            value(vnode);
            result.push(vnode);
          } else if (vnode[attrName] !== undefined && vnode[attrName].split(' ').includes(value)) {
            if (typeof cb === 'function') {
              cb(vnode);
            }

            result.push(vnode);
          }

          if (vnode.firstChild) {
            dig(vnode.firstChild);
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
      attrName = utils.dashToCamelCase(attrName);

      (function dig(vnode) {
        if (vnode) {
          if (vnode[attrName] !== undefined && vnode[attrName].split(' ').includes(value)) {
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
    key: 'plugins',
    value: function plugins(Plugins) {
      var _this5 = this;

      if (!Plugins.length > 0) {
        return null;
      }

      utils.check(Plugins, function () {
        return utils.loop(Plugins, function (Plugin) {
          _this5.extend(new Plugin(_this5));
        });
      });
    }
  }, {
    key: 'prepend',
    value: function prepend($node, states) {
      var _this6 = this;

      var node = new Model($node);
      node.parent = this.model;

      if (this.firstChild) {
        node.next = this.firstChild;
        this.firstChild.prev = node;
      }

      this.firstChild = node;

      utils.debounce(function () {
        _this6.$node.prepend(node.$node);
        utils.init(node, states);
      })();

      return node;
    }
  }]);

  return Vnode;
}();

exports.default = Vnode;
module.exports = exports['default'];

/***/ }),

/***/ "./src/vnom.js":
/*!*********************!*\
  !*** ./src/vnom.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _descriptor = __webpack_require__(/*! ./descriptor */ "./src/descriptor.js");

var _descriptor2 = _interopRequireDefault(_descriptor);

var _global = __webpack_require__(/*! ./global */ "./src/global.js");

var _global2 = _interopRequireDefault(_global);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _vtext = __webpack_require__(/*! ./vtext */ "./src/vtext.js");

var _vtext2 = _interopRequireDefault(_vtext);

var _vstyle = __webpack_require__(/*! ./vstyle */ "./src/vstyle.js");

var _vstyle2 = _interopRequireDefault(_vstyle);

var _resizeObserverPolyfill = __webpack_require__(/*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vnom = function Vnom($node) {
  _classCallCheck(this, Vnom);

  var props = {};
  var id = $node.getAttribute('id') || _utils2.default.uid();

  if ($node.id !== id) {
    $node.id = id;
  }

  props.id = {
    value: id,
    watcher: function watcher() {
      throw 'Cannot change id of ' + this;
    }
  };

  props.$node = {
    value: $node,
    watcher: function watcher() {
      throw 'Cannnot change the node of ' + this;
    }
  };

  props.tagName = {
    value: $node.tagName.toLowerCase(),
    watcher: function watcher() {
      throw 'Cannot change node type of ' + this;
    }
  };

  props.show = {
    value: $node.style.display === 'block',
    watcher: function watcher(show) {
      if (show) {
        if ($node.style.removeProperty) {
          $node.style.removeProperty('display');
        } else {
          $node.style.removeAttribute('display');
        }
      } else {
        $node.style.display = 'none';
      }
    }
  };

  props.class = {
    value: $node.getAttribute('class'),
    watcher: function watcher(newVal) {
      _utils2.default.nextFrame(function () {
        return $node.setAttribute('class', newVal);
      });
    }
  };

  props.parent = null;
  props.firstChild = null;
  props.lastChild = null;
  props.next = null;
  props.prev = null;

  _utils2.default.check($node.attributes, function (attributes) {
    return _utils2.default.loop(attributes, function (attribute) {
      var attrName = _utils2.default.dashToCamelCase(attribute.nodeName);
      var $attrValue = attribute.nodeValue;

      if (!attrName in props && attrName !== 'for') {
        props[attrName] = {
          value: $attrValue,
          watcher: function watcher(newVal) {
            _utils2.default.nextFrame(function () {
              return $node.setAttribute(_utils2.default.camelCaseToDash(attrName), attrValue);
            });
          }
        };
      }
    });
  });

  props.style = new _vstyle2.default(id);

  return props;
};

exports.default = Vnom;
module.exports = exports['default'];

/***/ }),

/***/ "./src/vstyle.js":
/*!***********************!*\
  !*** ./src/vstyle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _descriptor = __webpack_require__(/*! ./descriptor */ "./src/descriptor.js");

var _descriptor2 = _interopRequireDefault(_descriptor);

var _global = __webpack_require__(/*! ./global */ "./src/global.js");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(id) {
  _classCallCheck(this, _class);

  var $styleNode = _utils2.default.createStyleNode();
  var updateStyles = _utils2.default.debounce(function (styles) {
    updateStyleNode(styles);
  });

  return {
    value: function value(values) {
      if (!values) {
        updateStyles(this.value);
        return this.value || {};
      }

      return values;
    },
    watcher: function watcher(vals) {
      _utils2.default.nextFrame(function () {
        return updateStyleNode(vals);
      });
    }
  };

  function updateStyleNode(styles) {
    if (!_utils2.default.check(styles)) {
      $styleNode.innerHTML = '';
      return;
    }

    var styleString = '#' + id + '{';

    _utils2.default.loop(styles, function (value, prop) {
      styleString += _utils2.default.camelCaseToDash(prop) + ':' + value + ';';
    });

    styleString += '}';

    if ($styleNode.parentNode === null) {
      _global2.default.head.appendChild($styleNode);
    }

    $styleNode.innerHTML = styleString;
  }
};

exports.default = _class;
module.exports = exports['default'];

/***/ }),

/***/ "./src/vtext.js":
/*!**********************!*\
  !*** ./src/vtext.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _descriptor = __webpack_require__(/*! ./descriptor */ "./src/descriptor.js");

var _descriptor2 = _interopRequireDefault(_descriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class($node) {
  _classCallCheck(this, _class);

  var $originalContent = $node.textContent;
  var props = {};
  var refs = $originalContent.match(_utils2.default.mustacheRegex).map(function (match) {
    return match.match(/[\w\.]+/)[0];
  }).filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });

  var contents = $node.textContent.split(_utils2.default.mustacheRegex);

  var $lastNode = $node;

  _utils2.default.loop(contents, function (content) {
    $node.textContent = '';
    var index = refs.indexOf(content);
    var $newNode = document.createTextNode('');

    if (index > -1) {
      var ref = refs[index];

      (function loop(object, refs, index) {
        var key = refs[index];
        index++;
        object[key] = object[key] || {};

        if (index < refs.length) {
          loop(object[key], refs, index);
          return object;
        } else {
          if (!object[key].watcher) {
            object[key].watcher = [];
          }
          object[key].watcher.push(function (newVal) {
            $newNode.textContent = newVal;
          });
        }
      })(props, ref.split('.'), 0);
    } else {
      $newNode.textContent = content;
    }

    $lastNode.after($newNode);
    $lastNode = $newNode;
  });

  return props;

  function replace($node, $originalContent, object, cb) {
    $node.textContent = $originalContent.replace(_utils2.default.mustacheRegex, function (match, variable) {
      return cb(variable, object);
    });
  }
};

exports.default = _class;
module.exports = exports['default'];

/***/ })

/******/ });
});
//# sourceMappingURL=main.js.map