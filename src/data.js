export default class Data {
  constructor (data, cb) {
    this.method = null;
    this.data = data;
    this.cb = cb;

    if (typeof data === 'function') {
      this.method = data
      this.data = data()
    }
  }

  get () {
    return this.data
  }

  set (val) {
    let newVal;
    let oldVal = this.data;
    let watcher = this.cb();

    if (this.method) {
      newVal = this.method(val)
    } else {
      newVal = val
    }

    if (newVal === oldVal) {
      return
    }

    if (watcher) {
      watcher(newVal, oldVal)
    }
  }
}
