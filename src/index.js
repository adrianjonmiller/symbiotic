function getType (el) {
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

function getBehaviors($node, behaviors) {
    var keys = Object.keys(behaviors);
    var classes = $node.getAttribute('class');

    if (classes) {
        classes.split(' ').filter(function (behavior) {
            return keys.indexOf(behavior) > -1
        }).map((behavior) => {
            try {
                (behaviors[behavior].bind($node))();
            } catch (error) {
                console.error(error.stack);
            }
        })
    }
}

function getChildren($node, behaviors) {
    for (let i = 0; i < $node.childNodes.length; i++) {
        let $child = $node.childNodes[i];

        if ($child.nodeType === 1) {
            getBehaviors($child, behaviors);
            getChildren($child, behaviors);
        }
    }
}



export default class Symbiote {
    constructor (behaviors) {
        this.behaviors = behaviors;
    }

    attach (el) {    
        this.$scope = getType(el);

        ((cb) => {
            if (document.readyState !== 'loading') {
                return cb(this.scope, this.behaviors);
            } else {
                document.addEventListener('DOMContentLoaded', cb(this.$scope, this.behaviors));
            }
        })(getChildren);
    }
}

if (window && window.Symbiote === undefined) {
    window.Symbiote = Symbiote;
}