let net = require('net');
let server = net.createServer();
function parserHeader(h) {
  let obj = {};
  let headers = h.split(/\r\n/);
  let line = headers.shift();
  let [method,path,version] = line.split(' ');
  let head = {}
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
    let [head,content ]  = result.split(/\r\n\r\n/);
    let obj = parserHeader(head);
    // readable方法会触发多次，触发一次后就移除掉
    socket.removeListener('readable',fn);
      // socket.unshift(socket);
      // callback(socket,socket)；这样写触发不了end
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