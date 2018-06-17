let net = require('net');
let server = net.createServer();
function parserHeader(h) {
  let obj = {};
  let headers = h.split(/\r\n/);
  let line = headers.shift();//第一行是请求行   POST / HTTP/1.1
  let [method,path,version] = line.split(' ');
  let head = {}
  //剩下的都是请求头
  headers.forEach(line => {
    let [key,value] = line.split(': ');
    head[key] = value;
  });
  obj['method'] = method;
  obj['path'] = path;
  obj['version'] = version;
  obj['headers'] = head
  return obj
}
let {Readable} = require('stream');
class IncomingMessage extends Readable{
  _read(){}
}
function parser(socket,callback) {
  let im = new IncomingMessage
  function fn() {
    let result = socket.read().toString();
    console.log(result);
    // `
    //   POST / HTTP/1.1
    //   Host: localhost:3000
    //   User-Agent: curl/7.54.0
    //   Accept: */*
    //   Content-Length: 9
    //   Content-Type: application/x-www-form-urlencoded
    //
    //   name=zfpx
    // `
    let [head,content ]  = result.split(/\r\n\r\n/);//头部和请求体(name=zfpx)分开，注意是两个\r\n
    let obj = parserHeader(head);//解析头
    // readable方法会触发多次，触发一次后就移除掉
    socket.removeListener('readable',fn);//readable读完缓存区后，会再次出发读，移除掉
      // socket.unshift(socket);//把数据塞给socket，socket里面才有数据，才可以触发data事件
      // callback(socket,socket)；这样写触发不了end，socket有end方法，但是end的触发时机是浏览器关闭，不是接收数据完毕
    // 就是把请求体的部分再塞回到可读流生成
    Object.assign(im,obj);//im相当于req，所以需要把obj塞给im，作为属性
    im.push(content);//push的内容就是im读到的内容
    im.push(null);//push null来终止 触发end
    callback(im,socket);
  }
  socket.on('readable',fn);
}
server.on('connection',function (socket) {
    parser(socket,function (req,res) {
      server.emit('request',req,res);
    })
});
server.on('request',function (req,res) {
  console.log(req.method);
  console.log(req.headers);
  req.on('data',function (data) {
    console.log(data.toString());
  });
  req.on('end',function () {
    console.log('ok完毕');
    res.end(`
HTTP/1.1 200 ok
Content-Length: 2

ok
    `)
  })
});
server.listen(3000);

// curl -X POST -v -d "name=zfpx" http://localhost:3000
