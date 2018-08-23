new Symbiote({
    'prevent': function () {
        this.$node = 'dom element';
        this.style = {

        }

        this.find('class', 'something', (item) => {
            console.log(item);
        })

        var p  = document.createElement('p');
        this.append(p);
    }
}).attach('#main');