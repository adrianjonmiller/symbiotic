import Symbiote from '../src/index.js';
import Button from './button.html';
import Plugin from 'Plugins/test'
import Plugin2 from './plugin';

function request(body, cb) {
    fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + '30d8c651eebea64a994dcba84ddd9d',
        },
        body: JSON.stringify(body),
    }).then(res => {
        return res.json()
    }).then((res) => {
        cb(null, res.data)
    }).catch((err) => {
        cb(err)
    });
}


new Symbiote({
    methods: {
        '.test': function () {
            this.on('UPLOAD', (item) => {
                item.state = 'loading';
                setTimeout(() => {
                    item.state = 'success'
                }, 3000)
            })
        },
        '.link-test': function () {
            this.states = {
                start: {
                    href: (href) => {
                        return href
                    },
                    on: {
                        hover: {
                            href: (href) => {
                                return href + '/directory' 
                            }
                        }
                    }
                },
                loading: {
                    style: {
                        color: 'orange'
                    }
                },
                success: {
                    style: {
                        color: 'green'
                    }
                }
            }

            this.$event('click', e => {
                this.emit('UPLOAD')
            })
        },
        '.js-test': function () {
            this.class = 'test'
        },
        'body': function () {   
            this.extend({
                something: function () {
                    return 'test'
                }
            });
        },
        '.event-test': function () {
            this.states = {
                start: {
                    on: {
                        SUBMIT: 'loading',
                        hover: {
                            style: {
                                backgroundColor: 'yellow',
                                color: 'black'
                            }
                        }
                    },
                    style: {
                        backgroundColor: 'blue',
                        color: 'white',
                        outline: 'none',
                        padding: '.5rem 1rem',
                        borderRadius: '.5rem',
                        lineHeight: '1em',
                        border: 'none'
                    },
                    class: (baseclass) => {
                        return 'ready ' + baseclass
                    },
                    text: 'Click me',
                },
                loading: {
                    on: {
                        REJECT: 'error',
                        RESOLVE: 'success'
                    },
                    style: {
                        backgroundColor: 'gray'
                    },
                    class: (currentClass) => {
                        console.log(currentClass)
                        return 'loading ' + currentClass
                    },
                    text: 'Clicked'
                },
                error: {
                    on: {
                        SUBMIT: 'loading'
                    }
                },
                success: {
                    on: {
                        SUBMIT: 'start'
                    },
                    style: {
                        backgroundColor: 'green'
                    },
                    text: "Success!"
                }
            };

            this.$event('click', e => {
                switch (this.state) {
                    case 'start':
                        this.emit('SUBMIT')
                    break;
                    
                    case 'loading':
                        this.emit("RESOLVE")
                    break;

                    case 'success':
                        this.emit('SUBMIT')
                    break;
                }                
            })
        },
        '#main': function () {
            this.success = 'awesome'
            this.success = 'awesome1'
            this.success = 'awesome2'
            this.success = 'awesome3'
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
        '.js-image': function () {
            return this
        },
        '#test': function () {
            this.extend({
                items: []
            })

            const body = {
                query: `{
                    allAbsolutes() {
                        className
                        description
                        thumbnail {
                        url
                        }
                    }
                    }`
                };

            request(body, (err, res) => {
                if (err) {
                    throw err
                }

                console.log(res)

                this.items = res.allAbsolutes
            })
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