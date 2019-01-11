import utils from './utils';

export default class {
  constructor ($node, model) {
    const ctx = this;
    this.$node = $node;
    this.originalContent = $node.textContent;
    this.model = model;
    this.data = {};

    this.replace((variable) => {
      (function loop(model, refs, index) {
        let key = refs[index];
        if (index < refs.length - 1) {
          model[key] = {};
          index++
          loop(model[key], refs, index)
        } else {
          Object.defineProperty(model, key, {
            get: () => {
              return ctx.data
            },
            set: (val) => {
              ctx.data = val
              ;(utils.debounce(() => {
                ctx.update()
              }))();
            },
            configurable: true
          })
        }
      })(this.model, variable.split('.'), 0)

      return utils.stringRef(variable, model);
    })  
  }

  replace (cb) {
    this.$node.textContent = this.originalContent.replace(utils.mustacheRegex, (match, variable) => {
      return cb(variable);
    });
  }

  update () {
    this.replace((variable) => {
      return utils.stringRef(variable, this.model);
    })
  }
}