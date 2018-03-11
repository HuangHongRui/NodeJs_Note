const http = require('http');
const server =http.createServer();
server.listen(8888);
const qs = require('querystring');
let users = [];

server.on('request', (req, res) => {
  const url = req.url;
  const path = url.substr(0, url.indexOf('?'));
  const queryString = url.substr(url.indexOf('?') + 1, url.length);
  const query = qs.parse(queryString);

  console.log('☞☞☞ 9527 [3]_simple_method_server 13', url);
  console.log('☞☞☞ 9527 [3]_simple_method_server 14', path);
  console.log('☞☞☞ 9527 [3]_simple_method_server 15', queryString);
  console.log('☞☞☞ 9527 [3]_simple_method_server 16', url.indexOf('?'));

  switch (path) {
    case '/user':
      switch (req.method) {
        case 'GET':
          res.statusCode = 200;
          res.end(JSON.stringify(users));
          break;
        case 'POST':
          // 可直接打印初 headers
          const contentType = req.headers['content-type'];
          // 如果不是 JSON 类型 则报错.
          if (contentType !== 'application/json') {
            res.statusCode = 400;
            res.end('Error')
          }
          // 设定一个中转变量.
          let reqBodyStr = '';
          // 当触发事件,获取数据时,将数据加到于变量中..
          req.on('data', data => {
            reqBodyStr += data.toString()
          });
          // 结束时触发事件,将变量解析并推入Users数组..返回状态与内容.
          req.on('end', () => {
            const user = JSON.parse(reqBodyStr);
            users.push(user);
            res.statusCode = 200;
            res.end(JSON.stringify(user));
          });
          break;
      }
      break;
    default:
      res.statusCode = 404;
      res.end('Not Found')
  }
});
