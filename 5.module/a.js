console.log(this === module.exports);//true 因为在module.export下执行,所以this就是module.exports
module.exports = 'zfpx'; // 'zfpx'
// exports = 'zfpx';// {}
// exports.a = '1';// {a:'1'}

//module.exports默认情况下是一个空对象{}
// exports 和module.exports关系
// exports 是module.export 的一个别名；  module.exports = exports = 'zfpx'
// 若将module.exports='zfpx'改为exports='ff';则结果为{},
// 若将module.exports='zfpx'改为exports.a = '1',则结果为{'a':1}


