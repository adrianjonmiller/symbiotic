'use strict';

// Polyfills
import './after-polyfill';
import templatePolyfill from 'template-polyfill';
import Promise from 'promise-polyfill';

// Imports
import Vnode from './vnode';
import utils from './utils';
import global from './global';

export default class Symbiotic {
  constructor (config) {
    global.data = config.data || {};
    global.states = config.states || {};
    global.plugins = config.plugins || [];
  }

  attach (el) {
  const $scope = utils.getScope(el);
  global.head = utils.findHead($scope);

  if (!'content' in document.createElement('template')) {
    this.boostrapTemplates(global.head);
  }
  
  return new Promise(function(resolve, reject) {
    ;((start) => {
      if (document.readyState !== 'loading') {
        resolve(start());
      } else {
        document.addEventListener('DOMContentLoaded', () => {
        resolve(start());
      });
    }
    })(() => {
        let t0 = performance.now();
        let vnode = new Vnode($scope);

        utils.init(vnode);

        let t1 = performance.now();
        console.log('Symbiote attached in ' + (t1 - t0) + ' milliseconds.');
        return vnode
      });
    })
  }

  boostrapTemplates (head) {
    const polyfillStyle = utils.createStyleNode();
    const polyfillScript = document.createElement('script');
    polyfillScript.innerText = 'document.createElement("template")';
    polyfillStyle.innerHTML = 'template { display: none !important};'
    head.appendChild(polyfillStyle);
    head.appendChild(polyfillScript);
    templatePolyfill();
  }
}

if (window && window.Symbiotic === undefined) {
  window.Symbiotic = Symbiotic;
}