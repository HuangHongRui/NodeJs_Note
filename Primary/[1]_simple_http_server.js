const http = require('http');
const server =http.createServer();
server.listen(8888);
const qs = require('querystring');

server.on('request', (req, res) => {
  const url = req.url;
  const path = url.substr(0, url.indexOf('?'));
  const queryString = url.substr(url.indexOf('?') + 1, url.length);
  const query = qs.parse(queryString);

  console.log('☞☞☞ 9527 simple_http_server 12', url);
  console.log('☞☞☞ 9527 simple_http_server 13', path);
  console.log('☞☞☞ 9527 simple_http_server 14', queryString);
  console.log('☞☞☞ 9527 simple_http_server 15', query);

  switch (path) {
    case '/one':
      res.statusCode = 200;
      res.end('This is One Page...Welcome !!');
      break;
    case '/two':
      res.statusCode = 200;
      res.end('Please Go Way !!!!');
      break;
    default:
      res.statusCode = 404;
      res.end(' Fuck You !!');
  }
});
