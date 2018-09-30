!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}(window,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=(r(n(2)),r(n(1)));function r(e){return e&&e.__esModule?e:{default:e}}t.default={id:0,prefix:"vnom-",mustacheRegex:/\{\{\s?(\w.+)\s?\}\}/g,camelCaseToDash:function(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},dashToCamelCase:function(e){return e.replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})},createStyleNode:function(){var e=document.createElement("style");return e.type="text/css",e},uid:function(){return this.prefix+this.id++},debounce:function(e){var t=null;return function(){var n=this,i=arguments;null!==t&&window.cancelAnimationFrame(t),t=window.requestAnimationFrame(function(){e.apply(n,i)})}},isNode:function(e){return"object"===("undefined"==typeof Node?"undefined":i(Node))?e instanceof Node:e&&"object"===(void 0===e?"undefined":i(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},check:function(e,t){if(null===e)return!1;if(void 0===e)return!1;switch(void 0===e?"undefined":i(e)){case"array":if(0===e.length)return!1;break;case"object":if(!this.isNode(e)&&0===Object.keys(e).length)return!1;break;case"string":if(""===e)return!1}return"function"!=typeof t||t.apply(null,[e])},loop:function(e,t){var n=e.length,i=[];if(n>0)for(var o=0;o<n;o++){var r=t.apply(null,[e[o],o,n]);r&&i.push(r)}else for(var u in e){t.apply(null,[e[u],u])&&i.push()}return i},getTextNode:function(e,t){if(3===e.nodeType&&e.nodeValue.trim().length>0)return t(e)},getTemplateNode:function(e,t){if("TEMPLATE"===e.tagName)return"function"==typeof t?t.apply(null,[e.innerHTML]):e.innerHTML},stringRef:function(e,t){return e.split(".").reduce(function(e,t){return e[t]?e[t]:""},t)},init:function(e,t){if("function"!=typeof(t=t||o.default.methods)){for(var n in t){var i="",r="";switch(n.charAt(0)){case".":i="class",r=n.substring(1);break;case"#":i="id",r=n.substring(1);break;default:i="tagName",r=n}e[i]&&e[i].split(" ").indexOf(r)>-1&&(e.methods||(e.methods={}),void 0===e.methods[n]&&(e.methods[n]=t[n].bind(e)))}for(var u in e.child&&this.init(e.child,t),e.next&&this.init(e.next,t),e.methods)try{e.methods[u]()}catch(e){console.error(e.stack)}}else t.apply(e)},getScope:function(e){if(void 0===e)return document.body||document.querySelector("body");switch(void 0===e?"undefined":i(e)){case"string":return document.querySelector(e);case"object":return e}},findHead:function(e){return"HTML"===e.tagName?e.querySelector("head"):this.findHead(e.parentNode)}},e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={plugins:null,head:null,vdom:{}},e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=f(n(0)),u=f(n(1)),a=(f(n(4)),f(n(5))),l=f(n(6));function f(e){return e&&e.__esModule?e:{default:e}}var d=function(){function e(t){var n=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$styleNode=r.default.createStyleNode(),this.events={},this.style={},this.firstChild=null,this.lastChild=null,this.next=null,this.prev=null,this.$node=t,this.tagName=t.tagName.toLowerCase(),this.id=t.getAttribute("id")||r.default.uid(),this.show=!0,this.textNodes=[],this.width=t.offsetWidth,this.height=t.offsetHeight,this.model={$node:t,$event:this.$event.bind(this),textNodes:this.textNodes,on:this.on.bind(this),emit:this.emit.bind(this),append:this.append.bind(this),prepend:this.prepend.bind(this),find:this.find.bind(this),findParent:this.findParent.bind(this),render:this.render.bind(this),plugins:this.plugins.bind(this),extend:this.extend.bind(this)},this.id!==t.getAttribute("id")&&t.setAttribute("id",this.id),"template"===this.tagName&&(this.template=r.default.getTemplateNode(t),this.model.template=this.template),u.default.vdom[this.id]={tagName:this.tagName,id:this.id,show:this.show,nodeType:t.nodeType},Object.defineProperty(this.model,"id",{get:function(){return n.id}}),Object.defineProperty(this.model,"tagName",{get:function(){return n.tagName}}),Object.defineProperty(this.model,"show",{get:function(){return n.show},set:function(e){e?t.style.removeProperty?t.style.removeProperty("display"):t.style.removeAttribute("display"):t.style.display="none",n.show=e}}),Object.defineProperty(this.model,"prev",{get:function(){return n.prev},set:function(e){return n.prev=e,n.prev}}),Object.defineProperty(this.model,"next",{get:function(){return n.next},set:function(e){return n.next=e,n.next}}),Object.defineProperty(this.model,"child",{get:function(){return n.firstChild},set:function(e){return n.firstChild=e,n.firstChild}}),Object.defineProperty(this.model,"parent",{get:function(){return n.parent},set:function(e){return n.parent=e,n.parent}}),Object.defineProperty(this.model,"style",{get:function(){return n.updateStyles(n.style,n.$styleNode,n.id),n.style},set:function(e){return Object.assign(n.style,e),n.updateStyles(n.style,n.$styleNode,n.id),n.style}}),r.default.check(t.attributes,function(e){return r.default.loop(e,function(e){var i=r.default.dashToCamelCase(e.nodeName),o=e.nodeValue;n[i]||"id"===i||"for"===i||(n[i]=o,Object.defineProperty(n.model,i,{get:function(){return n[i]},set:function(e){n[i]!==e&&(n[i]=e,r.default.debounce(function(e){e.setAttribute(r.default.camelCaseToDash(i),root[i])})(t))}}))})}),r.default.check(t.childNodes,function(t){return r.default.loop(t,function(t){if(1===t.nodeType){var i=new e(t);i.parent=n.model,n.lastChild?(n.lastChild.next=i,i.prev=n.lastChild):(n.firstChild=i,n.model.child=i),n.lastChild=i}r.default.getTextNode(t,function(e){n.textNodes.push(new l.default(e,n.model))})})}),t.getAttribute("for")){var i=t.getAttribute("for").split(" in "),o=i[0],a=i[1];this.cloned=[],Object.defineProperty(this.model,a,{set:function(e){n[a]=e,r.default.loop(e,function(e,t){if(void 0===n.cloned[t]){var i=n.$node.content.children[0].cloneNode(!0);n.cloned[t]=n.parent.append(i)}n.cloned[t].data&&n.cloned[t].data===o&&(n.cloned[t][o]=e),n.cloned[t].find("data",o,function(t){t[o]=e})})},get:function(){return n[a]}})}return null!==u.default.plugins&&this.plugins(u.default.plugins),this.model}return o(e,[{key:"append",value:function(t,n){var i=this,o=new e(t);return o.parent=this.model,this.firstChild||(this.firstChild=o),this.lastChild&&(o.prev=this.lastChild,this.lastChild.next=o),this.lastChild=o,r.default.debounce(function(){i.$node.appendChild(o.$node),r.default.init(o,n)})(),console.log(o),o}},{key:"$event",value:function(e,t,n){var i=this;n=n||!1,this.$node.addEventListener(e,function(e){return t.apply(i.model,[e])},n)}},{key:"emit",value:function(e,t){var n=!0;if(t=t||this.model,void 0===this.events&&(this.events={}),this.events[e])for(var i=0;i<this.events[e].length;i++){var o=this.events[e][i];o.fn(t),n=o.bubbles?n:o.bubbles}n&&this.parent&&this.parent.emit(e,t)}},{key:"extend",value:function(e){!function e(t,n){r.default.check(n,function(n){return r.default.loop(n,function(n,o){if(void 0!==t[o])throw"Key on model cannot be redefined";var r=new a.default(n);"object"===(void 0===n?"undefined":i(n))?(t[o]=t[o]||{},e(t[o],n)):Object.defineProperty(t,o,{get:function(){return r.get()},set:function(e){r.set(e)},configurable:!0})})})}(this.model,e)}},{key:"find",value:function(e,t,n){var i=[];return e=r.default.dashToCamelCase(e),function o(r){r&&(void 0!==r[e]&&r[e].indexOf(t)>-1&&("function"==typeof n&&n(r),i.push(r)),r.child&&o(r.child),r.next&&o(r.next))}(this.firstChild),i}},{key:"findParent",value:function(e,t,n){var i=[];return e=r.default.dashToCamelCase(e),function o(r){r&&(void 0!==r[e]&&r[e].indexOf(t)>-1&&("function"==typeof n&&n(r),i.push(r)),r.parent&&o(r.parent))}(this.firstChild),i}},{key:"on",value:function(e,t){var n=(e=e.split("."))[0],i="prevent"!==e[1];void 0===this.events&&(this.events={}),void 0===this.events[n]&&(this.events[n]=[]),this.events[n].push({fn:t,bubbles:i})}},{key:"plugins",value:function(e){var t=this;if(!e.length>0)return null;r.default.check(e,function(){return r.default.loop(e,function(e){new e(t.model)})})}},{key:"prepend",value:function(t,n){var i=this,o=new e(t);return o.parent=this.model,this.firstChild&&(o.next=this.firstChild,this.firstChild.prev=o),this.firstChild=o,r.default.debounce(function(){i.$node.prepend(o.$node),r.default.init(o,n)})(),o}},{key:"render",value:function(e){var t=this;if(e.template||"template"===this.tagName){var n=e.template||this.template,i=e.data||{},o=e.methods||u.default.methods,a=n.match(/{{{?(#[a-z ]+ )?[a-z ]+.[a-z ]*}?}}/g),l=document.createRange();r.default.check(a,function(e){return r.default.loop(e,function(e){var t=e.replace(/{{|}}/g,"").trim(),o=r.default.stringRef(t,i);n=n.replace(e,o)})});var f=l.createContextualFragment(n);return r.default.check(f.children,function(e){return r.default.loop(e,function(e){return"template"!==t.tagName?t.append(e,o):void 0!==t.parent?t.parent.append(e,o):void 0})})}}},{key:"updateStyles",value:function(){var e=this;r.default.debounce(function(){if(r.default.check(e.style)){var t="#"+e.id+"{";r.default.loop(e.style,function(e,n){t+=r.default.camelCaseToDash(n)+":"+e+";"}),t+="}",null===e.$styleNode.parentNode&&u.default.head.appendChild(e.$styleNode),e.$styleNode.innerHTML=t}else e.$styleNode.innerHTML=""})()}}]),e}();t.default=d,e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=a(n(2)),r=a(n(0)),u=a(n(1));function a(e){return e&&e.__esModule?e:{default:e}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),u.default.data=t.data||{},u.default.methods=t.methods||{},u.default.plugins=t.plugins||[]}return i(e,[{key:"attach",value:function(e){var t=this,n=r.default.getScope(e);u.default.head=r.default.findHead(n),function(e){"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",function(){e()})}(function(){var e=performance.now();t.vnom=new o.default(n,u.default.data),r.default.init(t.vnom);var i=performance.now();console.log("Symbiote attached in "+(i-e)+" milliseconds.")})}}]),e}();t.default=l,window&&void 0===window.Symbiote&&(window.Symbiote=l),e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var i=this;i.watchers=n||[];var o={get:function(e,t,n){try{return new Proxy(e[t],o)}catch(i){return Reflect.get(e,t,n)}},defineProperty:function(e,t,n){return i.watchers.forEach(function(i){i.call(null,e,t,n)}),Reflect.defineProperty(e,t,n)},deleteProperty:function(e,t){return i.watchers.forEach(function(n){n.call(null,e,t,descriptor)}),Reflect.deleteProperty(e,t)}};return new Proxy(t,o)},e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data=t}return i(e,[{key:"get",value:function(){return"function"==typeof this.data?this.data():this.data}},{key:"set",value:function(e){if("function"==typeof this.data)this.data(e),this.watchers.forEach(function(t){"function"==typeof t&&t(e)});else if(this.data!==e){var t=this.data;this.data=e,this.watchers.forEach(function(n){"function"==typeof n&&n(e,t)})}}}]),e}();t.default=o,e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));var u=function(){function e(t,n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$node=t,this.originalContent=t.textContent,this.replace(function(e){var t=e.split(".").reduce(function(e,t){return"object"!==(void 0===e?"undefined":i(e))&&(e={}),console.log(e),console.log(t),e[t]={},e[t]});console.log(t),Object.defineProperty(n,e,{get:function(){return o[e]||""},set:function(t){o[e];o[e]=t,o.replace(function(e){return o[e]})}})})}return o(e,[{key:"replace",value:function(e){this.$node.textContent=this.originalContent.replace(r.default.mustacheRegex,function(t,n){return e(n)})}}]),e}();t.default=u,e.exports=t.default}])});