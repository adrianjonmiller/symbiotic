new Symbiote({
    'prevent': function () {
        this.emit('success');
        this.style = {
            color: "red",
            backgroundColor: 'white'
        };
        
        this.style.color = "blue"
        var p = document.createElement('p');
        p.innerHTML = 'Success';
        this.append(p)

        this.findParent('class', 'test', function (item) {
            console.log(item)
        })

        this.find('class', 'some-class-name', function (item) {
            console.log(item)
        })
    }
}).attach('#main');