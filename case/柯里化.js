const curry = func => {
    const g = (...allArgs) => allArgs.length >= func.length ?
            func(...allArgs)
            :(...args) => g(...allArgs, ...args);
    return g ;
}

const foo = curry((a,b,c,d)=>{
    console.log(a,b,c,d)
});
var ff = foo(1)(2)(3);
ff(4)

