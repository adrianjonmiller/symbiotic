class Vnode {
  constructor ($node) {
    const innerHTML = $node.innerHTML;
    this.model = {};
    const data = {};
    
    function update () {
      $node.innerHTML = innerHTML.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable) => {
        return data[variable] || '';
      })
    }
    
    $node.innerHTML = innerHTML.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable) => {
      Object.defineProperty(this.model, variable, {
        get: () => {
          return data[variable] || '';
        },
        set: (val) => {
          let oldVal = data[variable] || '';
          data[variable] = val;
          update()
        }
      })
      return ''
    });
    return this.model;
  }
}

var node = document.querySelector('.js-bound-quote')

var vnode = new Vnode(node);
vnode.movie = 'iron man';
vnode.quote = 'I rock';

setTimeout(function () {
  vnode.movie = 'superman';
  vnode.quote = 'I like to wear underwear'
}, 3000)
