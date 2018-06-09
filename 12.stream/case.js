let fs = require('fs');
let Readable = require('./readable');
let rs = new Readable('./1.txt',{
    highWaterMark:5
});
// let rs =fs.createReadStream('./1.txt',{
//     highWaterMark:5
// });
rs.on('readable',()=>{
    let r = rs.read(8); // 2^4 = 16
    console.log(r);


});


// 本周作业是流（写一篇关于流的文章）