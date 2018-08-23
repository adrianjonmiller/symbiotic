export default {
    id: 0,
    prefix: 'vnom-',
    head: null,
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

            if (frame !== null) window.cancelAnimationFrame(frame);

            frame = window.requestAnimationFrame(() => {
                func.apply(context, args);
            })
        }
    }
};