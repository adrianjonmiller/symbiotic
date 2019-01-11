import Utils from './utils';

export default class Descriptor {
  constructor(value, node) {
    this.watchers = [];
    this.value = null;
    this.computer = null;
    this.node = node || null;

    if (value === null) {
      this.value = null;
    } else {
      switch (typeof value) {
        case 'function':
          this.computer = value;
          this.value = null;
        break;

        case 'object':
          if ('$node' in value) {
            this.computer = value;
            this.value = null;
            break;
          }

          if (value instanceof Element) {
            this.value = value;
            break;
          }

          if ('watcher' in value) {
            this.addWatcher(value.watcher)
          }

          if ('value' in value) {
            if (typeof value.value === 'function') {
              this.computer = value.value;
              this.value = null;
            } else {
              this.value = value.value;
            }
            break;
          }

          if (this.value === null) {
            this.value = {};
          }

          Utils.loop(value, (val, key) => {
            Object.defineProperty(this.value, key, new Descriptor(val, this.node));
          })
        break;

        default:
          this.value = value;
        break;
      }
    }

    return {
      get: () => {
        if (this.computer) {
          return this.computer.call(this, this.value);
        }
        return this.value;
      },
      set: (value) => {
        if (this.value === value) {
          return;
        }

        if (this.computer) {
          this.value = this.computer.call(this, value);
          this.update();
          return;
        }

        if (value === null) {
          this.value = value
          this.update();
          return;
        }

        if (value instanceof Element) {
          this.value = value;
          this.update();
          return;
        }
        
        if (typeof value === 'object') {
          if ('$node' in value) {
            this.value = value;
            this.update();
            return;
          }

          if ('watcher' in value) {
            this.addWatcher(value.watcher);
            if (!('value' in value)) return
          }

          if ('value' in value) {
            this.value = value.value;
            this.update();
            return;
          }

          Utils.loop(value, (val, key) => {
            if (this.value === null) {
              this.value = {};
            }
            
            if (key in this.value) {
              this.value[key] = val;
            } else {
              Object.defineProperty(this.value, key, new Descriptor(val))
            }
          });
        }

        this.value = value;
        this.update();
      },
      writeable: true,
      enumerable: true,
      configurable: false
    }
  }

  update () {
    this.watchers.forEach((watcher) => {
      if (typeof this.value === 'function') {
        watcher(this.value())
      } else {
        watcher(this.value)
      }
    })
  }

  addWatcher (watcher) {
    if (Array.isArray(watcher)) {
      this.watchers = this.watchers.concat(watcher.map((fn) => {
          return fn.bind(this.node)
        })
      )
    }
    if (typeof watcher === 'function') {
      this.watchers.push(watcher.bind(this.node))
    }
  }
}