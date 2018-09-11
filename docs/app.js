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

            var item = {
                name: 'Bill',
                sex: "Male",
                shower: 'No'
            };

            this.plugins([Plugin2]);

            for (let i =0; i < 1000; i++) {
                this.render({
                    data: item
                });
            }

            this.extend({
                data: 'data'
            })
        },
        '#test': function () {
            var div = document.createElement('div');
            this.append(div, function () {
                console.log(this)
            })

            var nodes = this.render({
                template: '<div class="">{{   something.is}}</div>',
                data: {
                    something: {
                        is: 'awesome'
                    }
                } 
            });

            console.log(nodes)
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