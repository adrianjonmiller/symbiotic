import Symbiote from '../src/index.js';
import Button from './button.html';
import Plugin from 'Plugins/test'
import Plugin2 from './plugin';

new Symbiote({
    methods: {
        'body': function () {   
            this.extend({
                something: function () {
                    return 'test'
                }
            });
        },
        '#todo': function () {
            var data = [
                {
                    name: 'Bill',
                    sex: "Male",
                    shower: 'No'
                },{
                    name: 'Bill',
                    sex: "Male",
                    shower: 'No'
                }
            ]

            this.extend({
                name: 'Bill'
            })

            this.watch({
                name: function (newVal, oldVal) {
                    console.log(newVal, oldVal)
                }
            })

            this.name = 'test'

            console.log(this.name)

            var item = {
                name: 'Bill',
                sex: "Male",
                shower: 'No'
            };

            this.plugins([Plugin2]);

            this.extend({
                data: 'data'
            })
        },
        '.js-item': function () {

        },
        '#test': function () {
            this.success = [
                    {item: 'soemthing'},
                    {item: 'something 2'}
                ];

            // this.success[1].item = 'something 3';
            this.success.push({item: 'something 4'});
            this.success.push({item: 'something 5'});
        }
    },
    plugins: [Plugin],
    data: {
        name: 'some data',
        something: {
            test: 'awesome'
        }
    }
}).attach();