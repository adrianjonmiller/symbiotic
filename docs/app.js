new Symbiote({
    'some-class-name': function () {
        this.$node.innerHTML = 'This was added by Symbiote.Js'
    },
    'test': function () {
        this.class = 'awesome'
        this.$node.innerHTML = 'This was addeds'
        console.log(this)
    },
    newTest: function () {
        console.log(this);
        this.$node.innerHTML = 'This was added by Symbiote.Js'
    }
}).attach('#main');