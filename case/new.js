function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

// 模拟new
function objectFactory() {

    var obj = new Object(),

    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);//对返回指值做处理，如果是引用对象则返回对象，如果是基本类型则忽略返回值，依然返回对象obj

    return typeof ret === 'object' ? ret : obj;

};

var person = objectFactory(Otaku, 'Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin