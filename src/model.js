import utils from './utils';

export default class Model {
    constructor ($node) {
        const model = {
            $node: $node
        };

        if ($node.attributes) {
            for (let i = 0; i < $node.attributes.length; i++) {
                let attrName = utils.dashToCamelCase($node.attributes[i].nodeName);
                let $attrValue = $node.attributes[i].nodeValue;

                this[attrName] = $attrValue;

                Object.defineProperty(model, attrName, {
                    get: () => {
                        return this[attrName]
                    },
                    set: (val) => {
                        if (this[attrName] !== val) {                            
                            ;(utils.debounce(($node) => {
                                this[attrName] = val;
                                $node.setAttribute(utils.camelCaseToDash(attrName), this[attrName]);
                            }))($node);
                        }
                        return this[attrName]
                    }
                })
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