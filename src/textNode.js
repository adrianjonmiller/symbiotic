import utils from './utils';

export default class {
  constructor ($textNode) {
    // this.data = {
    //   some: {
    //     thing: 'this is useful',
    //     awesome: 'this is awesome'
    //   }
    // };

    // var text = {};

    // const ctx = this;
    // this.model = {};
    // this.content = $textNode.content || $textNode.nodeValue;
    // this.$node = $textNode;

    // var vars = this.content.match(/{{{?(#[a-z ]+ )?[a-z ]+.[a-z ]*}?}}/g);

    // if (vars) {
    //   this.model.vars = vars.map((item) => {return item.replace(/{{|}}/g, '')});
    // }

    // if (this.model.vars) {
    //   this.model.vars.forEach((item, index, array) => {
    //     var ref = item.trim();
    //     console.log(ref)
    //     var res = utils.stringRef(ref, this.data);
    //     var replaceStr = `{{${item}}}`;

    //     console.log(res)

    //     if (res) {
    //       this.content = this.content.replace(`{{${item}}}`, res);
    //     } else {
    //       this.content = this.content.replace(`{{${item}}}`, '');
    //     }

    //     if (index === array.length - 1) {
    //       this.$node.nodeValue = this.content;
    //     }
    //   })
    // }

    return $textNode;
  }
}