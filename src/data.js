export default class Data {
  constructor (data) {
    this.data = data;
  }

  get () {
    if (typeof this.data === 'function') {
      return this.data();
    }

    return this.data;
  }

  set (value) {
    if (typeof this.data === 'function') {
      this.data(value);

      this.watchers.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(value);
        }
      });
    } else if (this.data !== value) {
      let old = this.data;

      this.data = value;
      this.watchers.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(value, old);
        }
      });
    }
  }
}
