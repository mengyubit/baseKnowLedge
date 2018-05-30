function spread(x, ...args) {
  sum(...args); //展开运算符
}
function sum(a, b, c, d) {
  console.log(a, b, c, d)
}
spread('x', 1, 2, 3, 4);
// let arr = [1, 2, 3, 4].concat([5, 6, 7]);

let arr = [...[1, 2, 3, 4], ...[5, 6, 7]];
console.log(arr);
Math.min(...[1, 2, 3, 4]);
console.log(...[1, 2, 3, 4]);

// ...是浅拷贝
let name = { name: 'zfpx' };
let age = { age: 9 };
let school = { ...name, ...age };
console.log(school);

// slice是浅拷贝 如果拷贝一层就是深拷贝
// ...也是浅拷贝
let b = [1, 2, 3]
let a = [b];
let c = a.slice(0); // 是深拷贝 还是浅拷贝
b[0] = 100;
console.log(c);

// 深拷贝的实现 (都会变成对象，还不支持函数。。。。)
let obj = { a: 1, fn: function (params) { }, t: /a/, d: new Date(), a: null }
console.log(JSON.parse(JSON.stringify(obj)));

// 实现深拷贝 保留继承关系 可以实现各种类型的拷贝 实现递归拷贝

// 需要递归拷贝
function deepClone(obj) {
    // 如果传递的是null 那就不处理
    // 函数没有引用关系
    if (typeof obj !== 'object') return obj;
    if (obj == null) return null;
    // 处理日期和正则
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    let instance = new obj.constructor(); // 看当前实例的constructor
    // 实现深拷贝
    for (let key in obj) {
        instance[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
    return instance;
}
// 函数不需要重新拷贝
let obj = { a: { a: 1 } }
let newObj = deepClone(obj);
obj.a.a = 2;
console.log(newObj);




