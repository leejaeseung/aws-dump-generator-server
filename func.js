Array.prototype.shuffle = function(size) {
    var leng = this.length

    while(leng){
        var index = Math.floor((leng--) * Math.random());

        var temp = this[leng]

        this[leng] = this[index]

        this[index] = temp
    }

    var ret = []

    for(var i = 0; i < size; i++)
        ret.push(this[i])

    return ret
}