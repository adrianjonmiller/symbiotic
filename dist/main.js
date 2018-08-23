!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}(window,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={id:0,prefix:"vnom-",camelCaseToDash:function(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},dashToCamelCase:function(e){return e.replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})},createStyleNode:function(){var e=document.createElement("style");return e.type="text/css",e},uid:function(){return this.prefix+this.id++},debounce:function(e){var t=null;return function(){var n=this,i=arguments;null!==t&&window.cancelAnimationFrame(t),t=window.requestAnimationFrame(function(){e.apply(n,i)})}}},e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=s(n(2)),u=s(n(0));function s(e){return e&&e.__esModule?e:{default:e}}var d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.methods=t}return i(e,[{key:"attach",value:function(e,t){var n=this,i=function(e){if(void 0===e)return document.body||document.querySelector("body");switch(void 0===e?"undefined":r(e)){case"string":return document.querySelector(e);case"object":return e}}(e);this.attribute=t?u.default.dashToCamelCase(t):"class",this.head=function e(t){return"HTML"===t.tagName?t.querySelector("head"):e(t.parentNode)}(i),function(e){if("loading"!==document.readyState){var t=e();t.on("nodeAppended",function(e){console.log("node appeneded"),n.init(e)}),n.init(t)}else document.addEventListener("DOMContentLoaded",function(){var t=e();t.on("nodeAppended",function(e){console.log("node appeneded"),n.init(e)}),n.init(t)})}(function(){return new o.default(i)})}},{key:"init",value:function(e){var t=this;e._head=this.head,e[this.attribute]&&e[this.attribute].split(" ").filter(function(e){return Object.keys(t.methods).indexOf(e)>-1}).map(function(n,i,r){if(e.methods||(e.methods={}),e.methods[n]=t.methods[n].bind(e),i===r.length-1)for(var o in e.methods)try{e.methods[o]()}catch(e){console.error(e.stack)}}),e.child&&this.init(e.child),e.next&&this.init(e.next)}}]),e}();t.default=d,window&&void 0===window.Symbiote&&(window.Symbiote=d),e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));function o(e,t,n,i){console.log(i),r.default.debounce(function(){if(0!==Object.keys(e).length){var o="#"+n+"{";for(var u in e)o+=r.default.camelCaseToDash(u)+":"+e[u]+";";o+="}",null===t.parentNode&&i.appendChild(t),t.innerHTML=o}else t.innerHTML=""})()}var u=function(){function e(t){var n=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$styleNode=r.default.createStyleNode(),this.events={},this.style={},this.firstChild=null,this.lastChild=null,this.next=null,this.prev=null,this.$node=t,this.tagName=t.tagName,this.id=t.getAttribute("id")||r.default.uid(),this.head=null,this.id!==t.getAttribute("id")&&t.setAttribute("id",this.id),this.model={$node:t,on:this.on.bind(this),emit:this.emit.bind(this),append:this.append.bind(this),prepend:this.prepend.bind(this),find:this.find.bind(this),findParent:this.findParent.bind(this)},Object.defineProperty(this.model,"id",{get:function(){return n.id}}),Object.defineProperty(this.model,"tagName",{get:function(){return n.tagName}}),Object.defineProperty(this.model,"_head",{get:function(){return n.head},set:function(e){n.head=e}}),Object.defineProperty(this.model,"prev",{get:function(){return n.prev},set:function(e){return n.prev=e,n.prev}}),Object.defineProperty(this.model,"next",{get:function(){return n.next},set:function(e){return n.next=e,n.next}}),Object.defineProperty(this.model,"child",{get:function(){return n.firstChild},set:function(e){return n.firstChild=e,n.firstChild}}),Object.defineProperty(this.model,"parent",{get:function(){return n.parent},set:function(e){return n.parent=e,n.parent}}),Object.defineProperty(this.model,"style",{get:function(){return o(n.style,n.$styleNode,n.id,n.head),n.style},set:function(e){return Object.assign(n.style,e),o(n.style,n.$styleNode,n.id,n.head),n.style}}),t.attributes)for(var i=function(e){var i=r.default.dashToCamelCase(t.attributes[e].nodeName),o=t.attributes[e].nodeValue;n[i]||(n[i]=o,Object.defineProperty(n.model,i,{get:function(){return n[i]},set:function(e){return n[i]!==e&&(n[i]=e,r.default.debounce(function(e){e.setAttribute(r.default.camelCaseToDash(i),n[i])})(t)),n[i]}}))},u=0;u<t.attributes.length;u++)i(u);if(t.childNodes)for(u=0;u<t.childNodes.length;u++){var s=t.childNodes[u];if(1===s.nodeType){var d=new e(s);d.parent=this.model,this.lastChild?(this.lastChild.next=d,d.prev=this.lastChild):(this.firstChild=d,this.model.child=d),this.lastChild=d}}return this.model}return i(e,[{key:"append",value:function(t,n){n=n||this.lastChild;var i=new e(t);return i.parent=this.model,n&&(i.prev=n,n=i),this.firstChild||(this.firstChild=i),this.lastChild=i,this.$node.appendChild(i.$node),this.emit("nodeAppended",i),i}},{key:"prepend",value:function(t){var n=new e(t);return n.parent=this.model,this.firstChild&&(n.next=this.firstChild,this.firstChild.prev=n),this.firstChild=n,this.$node.prepend(n.$node),this.emit("nodeAppended",n),console.log(n),n}},{key:"emit",value:function(e,t){var n=!0;if(t=t||this.model,void 0===this.events&&(this.events={}),this.events[e])for(var i=0;i<this.events[e].length;i++){var r=this.events[e][i];r.fn(t),n=r.bubbles?n:r.bubbles}n&&this.parent&&this.parent.emit(e,t)}},{key:"find",value:function(e,t,n){var i=[];return e=r.default.dashToCamelCase(e),function r(o){o&&(void 0!==o[e]&&o[e].indexOf(t)>-1&&("function"==typeof n&&n(o),i.push(o)),o.child&&r(o.child),o.next&&r(o.next))}(this.firstChild),i}},{key:"findParent",value:function(e,t,n){var i=[];return e=r.default.dashToCamelCase(e),function r(o){o&&(void 0!==o[e]&&o[e].indexOf(t)>-1&&("function"==typeof n&&n(o),i.push(o)),o.parent&&r(o.parent))}(this.firstChild),i}},{key:"on",value:function(e,t){var n=(e=e.split("."))[0],i="prevent"!==e[1];void 0===this.events&&(this.events={}),void 0===this.events[n]&&(this.events[n]=[]),this.events[n].push({fn:t,bubbles:i})}}]),e}();t.default=u,e.exports=t.default}])});