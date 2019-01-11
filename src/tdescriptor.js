export default class Descriptor {
  constructor(value, watcher, setable) {
    this.watchers = watcher ? [watcher] : [];
    this.setable = setable === undefined ? true : setable;

    if (typeof value === 'function') {
      this.computer = value;
      this.value = this.computer.apply(this);
    } else {
      this.value = value;
    }

    return {
      get: () => {
        if (typeof this.value === 'function') {
          return this.value()
        }
        return this.value;
      },
      set: (value) => {
        if (this.setable) {
          if (this.value === value) return

          if (typeof this.computer === 'function') {
            this.value = this.value.apply(this, [value])
          } else {
            this.value = value;
          }
          this.update();
        }
      },
      writeable: true,
      enumerable: true,
      configurable: false
    }
  }

  update() {
    this.watchers.forEach((watcher) => {
      watcher.apply(null, [this.value])
    })
  }
}