'use strict';

import Model from './model';
import utils from './utils';
import global from './global';

export default class Symbiote {
    constructor (config) {
        global.data = config.data || {};
        global.methods = config.methods || {};
        global.plugins = config.plugins || [];
    }

    attach (el) {
        const $scope = utils.getScope(el);
        global.head = utils.findHead($scope);

        ;((cb) => {
            if (document.readyState !== 'loading') {
                cb();
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    cb();   
                });
            }
        })(() => {
            let t0 = performance.now();
            this.vnom = new Model($scope, global.data);

            utils.init(this.vnom);

            let t1 = performance.now();
            console.log('Symbiote attached in ' + (t1 - t0) + ' milliseconds.');
        });
    }
}

if (window && window.Symbiote === undefined) {
    window.Symbiote = Symbiote;
}