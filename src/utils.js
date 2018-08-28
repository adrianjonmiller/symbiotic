import Model from './model';
import TextNode from './textNode';
import global from './global';

export default {
    id: 0,
    prefix: 'vnom-',
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
    },
    isNode: function (o) {
        return typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    },
    check (item, cb) {
        if (item === null) {
            return false
        }
        
        if (item === undefined) {
            return false
        }

        switch (typeof item) {
            case 'array':
                if (item.length === 0) {
                    return false
                }
                break;
            case 'object':
                if (!this.isNode(item)) {
                    if (Object.keys(item).length === 0) {
                        return false
                    }
                }
                break;
            case 'string':
                if (item === '') {
                    return false
                }
                break;
        }

        if (typeof cb === 'function') {
            return cb.apply(null, [item]);
        }

        return true;
    },
    loop (object, cb) {
        let length = object.length;
        let result = [];

        if (length > 0) {
            for (let i=0; i < length; i++) {
                let res = cb.apply(null, [object[i], i, length]);
                if (res) {
                    result.push(res)
                }
            }
        } else {
            for (let key in object) {
                let res = cb.apply(null, [object[key], key]);
                if (res) {
                    result.push();
                }
            }
        }
        return result;
    },
    getAttributes (attribute, root, model) {
        let attrName = this.dashToCamelCase(attribute.nodeName);
        let $attrValue = attribute.nodeValue;
  
        if (!root[attrName] && attrName !== 'id' && attrName !== 'for') {
            root[attrName] = $attrValue;

          Object.defineProperty(model, attrName, {
              get: () => {
                  return root[attrName]
              },
              set: (val) => {
                if (root[attrName] !== val) {
                    root[attrName] = val;

                  ;(utils.debounce(($node) => {
                    $node.setAttribute(utils.camelCaseToDash(attrName), root[attrName]);
                  }))($node);
                }
              }
          });
        }
    },
    getChildNodes ($child, root, model) {
        if ($child.nodeType === 1) {
            let child = new Model($child, global.plugins);
            child.parent = model;

            if (!root.lastChild) {
                root.firstChild = child;
                model.child = child;
            } else {
                root.lastChild.next = child;
                child.prev = root.lastChild;
            }
            root.lastChild = child;
        }
    },
    getTextNodes ($child, cb) {
        if ($child.nodeType === 3) {
            if ($child.nodeValue.trim().length > 0 ) {
                return cb($child)
            }
        }
    },
    getTemplateNode ($node, cb) {
        if ($node.tagName === 'TEMPLATE') {
            if (typeof cb === 'function') {
                return cb.apply(null, [$node.content.firstElementChild]);
            }
            return $node.content.firstElementChild;
        }
     },
    stringRef (ref, object) {
        return ref.split('.').reduce((object,i) => {
            return object[i]
        }, object);
    }
};


// var textNodes = (function getTemplateNodes ($template) {
            //     if ($template.childNodes.length > 0) {
            //         return utils.loop($template.childNodes, ($item) => {
            //             if ($item.nodeType === 3) {
            //                 return $item
            //             }
            //             return getTemplateNodes($item)[0]
            //         })
            //     }
            // })($template);
            
            // for (let i=0; i < textNodes.length; i++) {
            //     var textNode = textNodes[i];

            //     var names = textNode.nodeValue.split(/{{|}}/g).filter((item) => {
            //         return item.trim() !== '';
            //     });

            //     for (let j=0; j < names.length; j++) {
            //         var name = names[j]
            //         if (!template[name]) {
            //             template[name] = [];
            //         }

            //         template[name].push(textNode)
            //     }
            // }

            // var names = textNode.nodeValue.split(/{{|}}/g).filter((item) => {
            //     return item.trim() !== '';
            // });
            
        //     var data = {};
        //     var temp = ['a', 'b', 'c', 'd'];

        //     Object.defineProperty(data, 'items', {
        //         get: () => {
        //             return temp;
        //         },
        //         set: (val) => {
        //             temp = val;
        //         }
        //     });

        //     Object.defineProperty(data.items, 'push', {
        //         configurable: false,
        //         enumerable: false, // hide from for...in
        //         writable: false,
        //         value: function (val) {
        //             for (var i = 0, n = this.length, l = arguments.length; i < l; i++, n++) {   
        //                 console.log(this, n, this[n] = val)       
        //             }
        //             return n;
        //         }
        //     });

        //     data.items.push('f');

        //     utils.check($node.getAttribute('for'), (string) => {
        //         let args = string.split('in').map((item) => {return item.trim()});
        //         let array = data[args[1]];
        //         let key = args[0];

        //         if (utils.check(array)) {
        //             utils.loop(array, (item) => {
        //                 (function render (node) {
        //                     if (utils.check(node.parent)) {
        //                         var $clone = $template.cloneNode(true);

        //                         (function getTemplateNodes ($template) {
        //                             if ($template.childNodes.length > 0) {
        //                                 return utils.loop($template.childNodes, ($item) => {
        //                                     if ($item.nodeType === 3) {
        //                                         $item.textContent = $item.textContent.replace(`{{${key}}}`, item);
        //                                         return $item;
        //                                     }
        //                                     return getTemplateNodes($item)[0]
        //                                 })
        //                             }
        //                         })($clone);

        //                         node.parent.append($clone);
        //                     } else {
        //                         window.requestAnimationFrame( () => render(node));
        //                     }
        //                 })(this);
        //             });
        //         }
        //     });
        // }));

        // utils.check(global.plugins, (plugins) => utils.loop(plugins, (Plugin) => new Plugin(this.model, $node)));