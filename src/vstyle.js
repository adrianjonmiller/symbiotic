import Utils from './utils';
import Descriptor from './descriptor';
import Global from './global';

export default class {
  constructor (id) {
    const $styleNode = Utils.createStyleNode();
    const updateStyles = Utils.debounce(function (styles) {
      updateStyleNode(styles)
    })

    return {
      value: function (values) {
        if (!values) {
          updateStyles(this.value);
          return this.value || {};
        }

        return values
      },
      watcher: function (vals) {
        Utils.nextFrame(() => updateStyleNode(vals))
      }
    };

    function updateStyleNode (styles) {
      if (!Utils.check(styles)) {
        $styleNode.innerHTML = ''
        return
      }

      var styleString = `#${id}{`;

      Utils.loop(styles, function (value, prop) {
        styleString += `${Utils.camelCaseToDash(prop)}:${value};`;
      })

      styleString += '}';

      if ($styleNode.parentNode === null) {
        Global.head.appendChild($styleNode);
      }

      $styleNode.innerHTML = styleString;
    }
  }
}