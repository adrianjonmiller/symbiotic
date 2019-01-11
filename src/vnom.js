import Descriptor from './descriptor';
import Global from './global';
import Utils from './utils';
import Vtext from './vtext'
import Vstyle from './vstyle'
import ResizeObserver from 'resize-observer-polyfill';

export default class Vnom {
  constructor($node) {
    const props = {};
    const id = $node.getAttribute('id') || Utils.uid();

    if ($node.id !== id) {
      $node.id = id;
    }
    
    props.id = {
      value: id,
      watcher: function () {
        throw 'Cannot change id of ' + this;
      }
    }

    props.$node = {
      value: $node,
      watcher: function () {
        throw 'Cannnot change the node of ' + this;
      }
    }

    props.tagName = {
      value: $node.tagName.toLowerCase(),
      watcher: function () {
        throw 'Cannot change node type of ' + this;
      }
    }

    props.show = {
      value: $node.style.display === 'block',
      watcher: function (show) {
        if (show) {
          if ($node.style.removeProperty) {
            $node.style.removeProperty('display');
          } else {
            $node.style.removeAttribute('display');
          }
        } else {
          $node.style.display = 'none'
        }
      }
    }

    props.class = {
      value: $node.getAttribute('class'),
      watcher: function (newVal) {
        Utils.nextFrame(() => $node.setAttribute('class', newVal))
      }
    }

    props.parent = null;
    props.firstChild = null;
    props.lastChild = null;
    props.next = null;
    props.prev = null;

    Utils.check($node.attributes, (attributes) => Utils.loop(attributes, (attribute) => {
      let attrName = Utils.dashToCamelCase(attribute.nodeName);
      let $attrValue = attribute.nodeValue;

      if (!attrName in props && attrName !== 'for') {
        props[attrName] = {
          value: $attrValue,
          watcher: function (newVal) {
            Utils.nextFrame(() => $node.setAttribute(Utils.camelCaseToDash(attrName), attrValue));
          }
        }
      }
    }));

    props.style = new Vstyle(id)
    
    return props
  }
}