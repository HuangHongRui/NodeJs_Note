const http = require('http');
const server =http.createServer();
server.listen(8888);
const qs = require('querystring');
const fs = require('fs');
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
          res.end('GET');
          break;
        case 'POST':
          let user;
          req.on('data', data => {
            //qs.parse 将 'name=HongRui&password=123' 转为KeyValue对象.
            user = qs.parse(data.toString());
            console.log('☞☞☞ 9527 [6]_simple_form_submit_server 30', data.toString());
            console.log('☞☞☞ 9527 [6]_simple_form_submit_server 31', data);
            console.log('☞☞☞ 9527 [6]_simple_form_submit_server 32', user);
            console.log('☞☞☞ 9527 [6]_simple_form_submit_server 33', JSON.stringify(user));
          });
          req.on('end', () => {
            users.push(user);
            res.statusCode = 200;
            res.end(JSON.stringify(user));
          })
          break;
      }
      break;
    case '/index.html':
      res.statusCode = 200;
      fs.createReadStream('./index.html')
        .pipe(res);
      break;

    default:
      res.statusCode = 404;
      res.end('Not Found')
  }
});
