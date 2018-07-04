Function.prototype.bind = function(context,...args){
    return (...arg1)=>{
        return this.apply(context,[...args,...arg1])
    }
}

function add(a,b){
    return a + b;
}

var newFoo = add.bind(this,3);

console.log(newFoo(4));
////////////////////////////////////////////////////////////////

Function.prototype.bind = function(context,...args){
    let self = this;
    return function (){
        return self.apply(context,[...args,...Array.prototype.slice.call(arguments)])
    }
}

function add(a,b){
    return a + b;
}

var newFoo = add.bind(this,3);
console.log(newFoo(4));



var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');

console.log(obj.habit);
console.log(obj.friend);

////////////////
// 第四版
Function.prototype.bind = function(context,...args){
    let self = this;
    var fBound =  function (...arg1){
        context = this instanceof fBound ? this: context;
        return self.apply(context,[...args,...arg1])
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fBound.prototype = this.prototype;
    return fBound;
}

// 优化版
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
//https://github.com/mqyqingfeng/Blog/issues/12