import Utils from './utils';
import Descriptor from './descriptor';

export default class {
  constructor($node) {
    const $originalContent = $node.textContent;
    const props = {};
    const refs = $originalContent.match(Utils.mustacheRegex).map((match) => {
        return match.match(/[\w\.]+/)[0]
      }).filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

    const contents = $node.textContent.split(Utils.mustacheRegex);

    var $lastNode = $node;

    Utils.loop(contents, (content) => {
      $node.textContent = '';
      var index = refs.indexOf(content);
      var $newNode = document.createTextNode('');

      if (index > -1) {
        let ref = refs[index];

        (function loop(object, refs, index) {
          let key = refs[index];
          index++;
          object[key] = object[key] || {};

          if (index < refs.length) {
            loop(object[key], refs, index);
            return object;
          } else {
            if (!object[key].watcher) {
              object[key].watcher = [];
            }
            object[key].watcher.push(function (newVal) {
              $newNode.textContent = newVal
            });
          }
        })(props, ref.split('.'), 0);
      } else {
        $newNode.textContent = content
      }

      $lastNode.after($newNode);
      $lastNode = $newNode;
    });
    
    return props;

    function replace($node, $originalContent, object, cb) {
      $node.textContent = $originalContent.replace(Utils.mustacheRegex, (match, variable) => {
        return cb(variable, object);
      });
    }
  }
}