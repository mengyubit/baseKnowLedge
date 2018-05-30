let fs = require('fs');
let path = require('path');
// // 2) 广度
// function preWide(dir) {
//   let arr = [dir];
//   let index = 0;
//   while (arr[index]) {
//     let current = arr[index++];
//     let stat = fs.statSync(current);
//     if (stat.isDirectory()) {
//       let dirs = fs.readdirSync(current);
//       arr = [...arr, ...dirs.map(d => path.join(current, d))];
//     }
//   }
//   // 倒着删除
//   for (var i = arr.length-1; i >= 0; i--) {
//     let p = arr[i];
//     let stat = fs.statSync(p);
//     if (stat.isDirectory()) {
//       fs.rmdirSync(p)
//     } else {
//       fs.unlinkSync(p);
//     }
//   }
// }
// //preWide('a');
// // 今天作业：写一个广度异步删除
// // 改名字
// // fs.renameSync('1.txt','66.txt');
// // 截断
// // fs.truncateSync('./2.txt',3);
//
// // gulp 用它监控文件的变化
// fs.watchFile('2.txt',function (current,prev) {
//   if (Date.parse(prev.ctime) ==0 ){
//     console.log('创建');
//   } else if (Date.parse(current.ctime) ==0){
//     console.log('删除')
//   }else{
//     console.log('修改')
//   }
// });
//
//