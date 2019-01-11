import Symbiote from '../src/index.js';
import Button from './button.html';
import Plugin from 'Plugins/test'
import Plugin2 from './plugin';

new Symbiote({
  states: {
    'body': {
      data: {
        test: 'success'
      },
      methods: {
        func: function () {
          return 'success'
        }
      },
      'start': {
        on: {
          '$click': function () {
            this.state = 'loading'
          }
        },
        props: {
          class: 'starting',
          style: {
            backgroundColor: 'red'
          }
        },
        enter: function () {
          console.log(this.func())
        },
        ready: function () {
          // console.log('ready')
        },
        leave: function () {
          // console.log('leave')
        }
      },
      'loading': {
        on: {
          'success': 'start',
          'error': 'error'
        },
        props: {
          class: 'loading',
          style: {
            backgroundColor: 'blue'
          }
        },
        enter: function () { 
          setTimeout(() => {
            this.emit('success');
          }, 3000)
        }
      }
    }
  },
  plugins: [Plugin]
}).attach().then(function (vnode) {
});