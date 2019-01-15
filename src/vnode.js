import Vnom from './vnom';
import Utils from './utils';
import TextNode from './textNode';
import ResizeObserver from 'resize-observer-polyfill';
import Descriptor from './descriptor';
import Vtext from './vtext';

export default class Vnode {
  constructor($node) {
    var stateName = null;
    this.states = {};

    Object.defineProperty(this, 'state', {
      get: () => {
        return stateName
      },
      set: (newStateName) => {
        let oldState = this.getState(stateName);
        let newState = this.getState(newStateName);
        stateName = newStateName;

        if ('leave' in oldState) {
          oldState.leave.apply(this);
        }

        if ('enter' in newState) {
          newState.enter.apply(this);
        }

        if ('props' in newState) {
          Utils.loop(newState.props, (prop, key) => {
            this[key] = prop;
          })
        }

        if ('on' in newState) {
          Utils.loop(newState.on, (res, event) => {
            let fn = typeof res === 'function' ? res : () => { return this.state = res };
            if (event.charAt(0) === '$') {
              this.$on(event)
            }
          })
        }

        if ('ready' in newState) {
          newState.ready.apply(this)
        }
      }
    });

    this.extend(new Vnom($node));

    Utils.check($node.childNodes, ($children) => Utils.loop($children, ($child) => {
      if ($child.nodeType === 1) {
        let child = new Vnode($child);
        child.parent = this;

        if (this.lastChild) {
          this.lastChild.next = child;
          child.prev = this.lastChild;
        } else {
          this.firstChild = child;
        }

        this.lastChild = child
      }

      if ($child.nodeType === 3) {
        if ($child.nodeValue.match(Utils.mustacheRegex)) {
          this.extend(new Vtext($child));
        }
      }
    }));
  }

  setStates(newStates) {
    if ('data' in newStates) {
      this.extend(newStates.data);
      delete newStates.data;
    }

    if ('methods' in newStates) {
      for (let methodKey in newStates.methods) {
        this[methodKey] = newStates.methods[methodKey];
      }
      delete newStates.methods;
    }

    this.states = newStates;
  }

  getState (state) {
    if (state in this.states) {
      return this.states[state]
    }
    return {}
  }

  $on(event) {
    let $event = event.substring(1);
    let useCapture = false;

    this.$node.addEventListener($event, (e) => {
      let state = this.getState(this.state);

      if ('on' in state) {
        let events = state.on
        if (event in events) {
          let fn = typeof events[event] === 'function' ? events[event] : function () { this.state = events[event] };
          fn.call(this, e)
        }
      }
      
    }, useCapture)
  }

  append ($node, states) {
    let node = new Vnode($node);
    node.parent = this;

    if (!this.firstChild) {
      this.firstChild = node;
    }

    if (this.lastChild) {
      node.prev = this.lastChild;
      this.lastChild.next = node;
    }

    this.lastChild = node;

    Utils.nextFrame(() => {
      this.$node.appendChild(node.$node);
      Utils.init(node, states);
    });

    return node;
  }

  emit(event, payload) {
    let state = this.getState(this.state);
    let bubbles = true;
    payload = payload || this;
    
    if ('on' in state) {
      let events = state.on;

      if (event in events) {
        event = event.split('.');
        let eventName = event[0];
        let fn = events[eventName];

        bubbles = event[1] !== 'stop';

        fn = typeof fn === 'function' ? fn : function () { this.state = events[eventName] };
        fn.apply(this)
      }
    }

    if (bubbles && this.parent) {
      this.parent.emit(eventName, payload)
    }
  }

  extend (data) {
    Utils.check(data, (data) => Utils.loop(data, (value, key) => {
      if (key in this) {
        this[key] = value
      } else {
        Object.defineProperty(this, key, new Descriptor(value, this))
      }
    }));
  }

  find (attrName, value, cb) {
    let result = [];

    attrName = utils.dashToCamelCase(attrName);

    (function dig(vnode) {
      if (vnode) {
        if (vnode[attrName] !== undefined && typeof value === 'function') {
          value(vnode);
          result.push(vnode);

        } else if (vnode[attrName] !== undefined && vnode[attrName].split(' ').includes(value)) {
          if (typeof cb === 'function') {
            cb(vnode);
          }

          result.push(vnode);
        }

        if (vnode.firstChild) {
          dig(vnode.firstChild);
        }

        if (vnode.next) {
          dig(vnode.next);
        }
      }

    })(this.firstChild);

    return result;
  }

  findParent (attrName, value, cb) {
    let result = [];
    attrName = utils.dashToCamelCase(attrName);

    (function dig(vnode) {
      if (vnode) {
        if (vnode[attrName] !== undefined && vnode[attrName].split(' ').includes(value)) {
          if (typeof cb === 'function') {
            cb(vnode);
          }

          result.push(vnode);
        }

        if (vnode.parent) {
          dig(vnode.parent);
        }
      }

    })(this.firstChild);

    return result;
  }

  plugins (Plugins) {
    if (!Plugins.length > 0) {
      return null
    }

    utils.check(Plugins, () => utils.loop(Plugins, (Plugin) => {
      this.extend(new Plugin(this))
    }));
  }

  prepend ($node, states) {
    let node = new Model($node);
    node.parent = this.model;

    if (this.firstChild) {
      node.next = this.firstChild;
      this.firstChild.prev = node;
    }

    this.firstChild = node;

    (utils.debounce(() => {
      this.$node.prepend(node.$node);
      utils.init(node, states);
    }))();

    return node;
  }
}