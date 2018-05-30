let fs = require('fs');
let path = require('path');


// 1).异步实现  先序深度优先遍历删除
function rmdir(dir,callback) {
  fs.stat(dir,(err,stat)=>{
    if(stat.isDirectory()){ // 是目录的话？
      fs.readdir(dir,(err,dirs)=>{
        // 只要涉及到异步递归就用next
        // a/b 是没有内容的
        function next(index) {
          if ((dirs.length === 0) || (index === dirs.length)){
              return fs.rmdir(dir, callback)
          }
          let p = path.join(dir,dirs[index]); // a/b;
          rmdir(p,()=>next(index+1)); // 当删除a/b 就应该删除a/c;
        }
        next(0);
      });
    }else{
      fs.unlink(dir,callback);
    }
  })
}

rmdir('a',()=>{
  console.log('delete ok')
})