var main = document.getElementById('main');

new Symbiote({
    'some-class-name': function () {
        this.innerHTML = 'This was added by Symbiote.js'
    }
}).attach(main);