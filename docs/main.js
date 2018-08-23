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

/***/ "./dist/main.js":
/*!**********************!*\
  !*** ./dist/main.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  if ("object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module))) module.exports = t();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var i, n; }
}(window, function () {
  return function (e) {
    var t = {};function n(i) {
      if (t[i]) return t[i].exports;var r = t[i] = { i: i, l: !1, exports: {} };return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
    }return n.m = e, n.c = t, n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;if (4 & t && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var i = Object.create(null);if (n.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var r in e) {
        n.d(i, r, function (t) {
          return e[t];
        }.bind(null, r));
      }return i;
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 1);
  }([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = { id: 0, prefix: "vnom-", camelCaseToDash: function camelCaseToDash(e) {
        return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }, dashToCamelCase: function dashToCamelCase(e) {
        return e.replace(/-([a-z])/g, function (e) {
          return e[1].toUpperCase();
        });
      }, createStyleNode: function createStyleNode() {
        var e = document.createElement("style");return e.type = "text/css", e;
      }, uid: function uid() {
        return this.prefix + this.id++;
      }, debounce: function debounce(e) {
        var t = null;return function () {
          var n = this,
              i = arguments;null !== t && window.cancelAnimationFrame(t), t = window.requestAnimationFrame(function () {
            e.apply(n, i);
          });
        };
      } }, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        o = s(n(2)),
        u = s(n(0));function s(e) {
      return e && e.__esModule ? e : { default: e };
    }var a = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.methods = t;
      }return i(e, [{ key: "attach", value: function value(e, t) {
          var n = this,
              i = function (e) {
            if (void 0 === e) return document.body || document.querySelector("body");switch (void 0 === e ? "undefined" : r(e)) {case "string":
                return document.querySelector(e);case "object":
                return e;}
          }(e);this.attribute = t ? u.default.dashToCamelCase(t) : "class", function (e) {
            "loading" !== document.readyState ? n.init(e()) : document.addEventListener("DOMContentLoaded", function () {
              n.init(e());
            });
          }(function () {
            return new o.default(i);
          });
        } }, { key: "init", value: function value(e) {
          var t = this;e[this.attribute] && e[this.attribute].split(" ").filter(function (e) {
            return Object.keys(t.methods).indexOf(e) > -1;
          }).map(function (n, i, r) {
            if (e.methods || (e.methods = {}), e.methods[n] = t.methods[n].bind(e), i === r.length - 1) for (var o in e.methods) {
              try {
                e.methods[o]();
              } catch (e) {
                console.error(e.stack);
              }
            }
          }), e.child && this.init(e.child), e.next && this.init(e.next);
        } }]), e;
    }();t.default = a, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(0));var o = document.head || document.querySelector("head");function u(e, t, n) {
      r.default.debounce(function () {
        if (0 !== Object.keys(e).length) {
          var i = "#" + n + "{";for (var u in e) {
            i += r.default.camelCaseToDash(u) + ":" + e[u] + ";";
          }i += "}", null === t.parentNode && o.appendChild(t), t.innerHTML = i;
        } else t.innerHTML = "";
      })();
    }var s = function () {
      function e(t) {
        var n = this;if (function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.$styleNode = r.default.createStyleNode(), this.events = {}, this.style = { color: "blue" }, this.firstChild = null, this.lastChild = null, this.next = null, this.prev = null, this.$node = t, this.tagName = t.tagName, this.id = t.getAttribute("id") || r.default.uid(), this.id !== t.getAttribute("id") && t.setAttribute("id", this.id), this.model = { $node: t, on: this.on.bind(this), emit: this.emit.bind(this), append: this.append.bind(this), find: this.find.bind(this), findParent: this.findParent.bind(this) }, Object.defineProperty(this.model, "id", { get: function get() {
            return n.id;
          } }), Object.defineProperty(this.model, "tagName", { get: function get() {
            return n.tagName;
          } }), Object.defineProperty(this.model, "prev", { get: function get() {
            return n.prev;
          }, set: function set(e) {
            return n.prev = e, n.prev;
          } }), Object.defineProperty(this.model, "next", { get: function get() {
            return n.next;
          }, set: function set(e) {
            return n.next = e, n.next;
          } }), Object.defineProperty(this.model, "child", { get: function get() {
            return n.firstChild;
          }, set: function set(e) {
            return n.firstChild = e, n.firstChild;
          } }), Object.defineProperty(this.model, "parent", { get: function get() {
            return n.parent;
          }, set: function set(e) {
            return n.parent = e, n.parent;
          } }), Object.defineProperty(this.model, "style", { get: function get() {
            return u(n.style, n.$styleNode, n.id), n.style;
          }, set: function set(e) {
            return Object.assign(n.style, e), u(n.style, n.$styleNode, n.id), n.style;
          } }), t.attributes) for (var i = function i(e) {
          var i = r.default.dashToCamelCase(t.attributes[e].nodeName),
              o = t.attributes[e].nodeValue;n[i] || (n[i] = o, Object.defineProperty(n.model, i, { get: function get() {
              return n[i];
            }, set: function set(e) {
              return n[i] !== e && (n[i] = e, r.default.debounce(function (e) {
                e.setAttribute(r.default.camelCaseToDash(i), n[i]);
              })(t)), n[i];
            } }));
        }, o = 0; o < t.attributes.length; o++) {
          i(o);
        }if (t.childNodes) for (o = 0; o < t.childNodes.length; o++) {
          var s = t.childNodes[o];if (1 === s.nodeType) {
            var a = new e(s);a.parent = this.model, this.lastChild ? (this.lastChild.next = a, a.prev = this.lastChild) : (this.firstChild = a, this.model.child = a), this.lastChild = a;
          }
        }return this.model;
      }return i(e, [{ key: "append", value: function value(t, n) {
          n = n || this.lastChild;var i = new e(t);i.parent = this.model, n && (i.prev = n, n = i), this.firstChild || (this.firstChild = i), this.lastChild = i, this.$node.appendChild(i.$node);
        } }, { key: "emit", value: function value(e, t) {
          var n = !0;if (t = t || this.model, void 0 === this.events && (this.events = {}), this.events[e]) for (var i = 0; i < this.events[e].length; i++) {
            var r = this.events[e][i];r.fn(t), n = r.bubbles ? n : r.bubbles;
          }n && this.parent && this.parent.emit(e, t);
        } }, { key: "find", value: function value(e, t, n) {
          var i = [];return e = r.default.dashToCamelCase(e), function r(o) {
            o && (void 0 !== o[e] && o[e].indexOf(t) > -1 && ("function" == typeof n && n(o), i.push(o)), o.child && r(o.child), o.next && r(o.next));
          }(this.firstChild), i;
        } }, { key: "findParent", value: function value(e, t, n) {
          var i = [];return e = r.default.dashToCamelCase(e), function r(o) {
            o && (void 0 !== o[e] && o[e].indexOf(t) > -1 && ("function" == typeof n && n(o), i.push(o)), o.parent && r(o.parent));
          }(this.firstChild), i;
        } }, { key: "on", value: function value(e, t) {
          var n = (e = e.split("."))[0],
              i = "prevent" !== e[1];void 0 === this.events && (this.events = {}), void 0 === this.events[n] && (this.events[n] = []), this.events[n].push({ fn: t, bubbles: i });
        } }]), e;
    }();t.default = s, e.exports = t.default;
  }]);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./docs/app.js":
/*!*********************!*\
  !*** ./docs/app.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(/*! ../dist/main.js */ "./dist/main.js");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_main2.default);

new _main2.default({
    'test': function test() {
        console.log(this);
    }
}).attach();

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })

/******/ });
});
//# sourceMappingURL=main.js.map