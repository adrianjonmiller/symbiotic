import utils from './utils';

export default class {
  constructor ($node, model) {
    this.$node = $node;
    this.originalContent = $node.textContent;
    this.keys = [];
    this.model = model;
    this.data = {}

    this.replace((variable) => {
      Object.defineProperty(model, variable, {
        get: () => {
          return this.data[variable]
        },
        set: (val) => {
          this.data[variable] = val
          ;(utils.debounce(() => {
            this.update()
          }))();
        }
      })
      this.keys.push(variable);
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