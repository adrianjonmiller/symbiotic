var main = document.getElementById('main');

new Symbiote({
    'some-class-name': function () {
        console.log(this)
    }
}).attach(main);