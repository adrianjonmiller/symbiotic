import utils from './utils'

export default class Data {
  constructor (data, cb) {
    this.data = data;
    this.cb = cb;
    this.watchers = [];
  }

  get () {
    return this.data
  }

  set (val) {
    let newVal;
    let oldVal = this.data;
    let watcher = this.cb();

    if (newVal === oldVal) {
      return
    }

    this.data = newVal

    if (watcher) {   
      utils.nextFrame(() => watcher(newVal, oldVal));        
    }
  }
}