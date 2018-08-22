function type (el) {
    switch (typeof el) {
        case 'string':
            return document.querySelector(el);
        case 'object':
            return el;
        default:
            return document.body || document.querySelector('body');
    }
}

export default class Symbiote {
    constructor (behaviors) {
        this.behaviors = behaviors;
    }

    attach (el) {    
        var context = this;
        this.$scope = type(el);

        function getChildren ($node) {
            for (let i = 0; i < $node.childNodes.length; i++) {
                let $child = $node.childNodes[i];

                if ($child.nodeType === 1) {
                    getBehaviors($child);
                    getChildren($child);
                }
            }
        }

        function getBehaviors ($node) {
            var keys = Object.keys(context.behaviors);
            var classes = $node.getAttribute('class');

            if (classes) {
                classes.split(' ').filter(function (behavior) {
                    return keys.indexOf(behavior) > -1
                }).map((behavior) => {
                    try {
                        (context.behaviors[behavior].bind($node))();
                    } catch (error) {
                        console.error(error.stack);
                    }
                })
            }            
        }

        ((cb) => {
            if (document.readyState !== 'loading') {
                return cb(this.scope);
            } else {
                document.addEventListener('DOMContentLoaded', cb(this.$scope));
            }
        })(getChildren);
    }
}

if (window && window.Symbiote === undefined) {
    window.Symbiote = Symbiote;
}