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


class Model {
    constructor($node) {
        const model = {
            $node: $node
        };

        if ($node.attributes) {
            for (let i = 0; i < $node.attributes.length; i++) {
                let attrName = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].dashToCamelCase($node.attributes[i].nodeName);
                let $attrValue = $node.attributes[i].nodeValue;

                this[attrName] = $attrValue;

                Object.defineProperty(model, attrName, {
                    get: () => {
                        return this[attrName];
                    },
                    set: val => {
                        if (this[attrName] !== val) {
                            ;_utils__WEBPACK_IMPORTED_MODULE_0__["default"].debounce($node => {
                                this[attrName] = val;
                                $node.setAttribute(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].camelCaseToDash(attrName), this[attrName]);
                            })($node);
                        }
                        return this[attrName];
                    }
                });
            }
        }

        if ($node.childNodes) {
            var lastChild = null;

            for (let i = 0; i < $node.childNodes.length; i++) {
                let $child = $node.childNodes[i];
                let child = new Model($child);
                child.parent = model;

                if ($child.nodeType === 1) {
                    if (!lastChild) {
                        model.child = child;
                    } else {
                        lastChild.next = child;
                        child.prev = lastChild;
                    }
                    lastChild = child;
                }
            }
        }

        return model;
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
    prefix: 'Layer_',
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

            if (frame !== null) cancelAnimationFrame(frame);

            frame = requestAnimationFrame(() => {
                func.apply(context, args);
            });
        };
    }
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map