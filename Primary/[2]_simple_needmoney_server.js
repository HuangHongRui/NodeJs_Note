/*HTTP:
Schema:// host : port / path ? query # hash (协议:主机/端口/路径/参数/哈希)
Method: 获取 | GET
        创建 | Post
        修改 | Patch
        创建 | Put
        删除 | Delete
        列举 | Options
        返回Head信息 | Head
*/
const http = require('http');
const server =http.createServer();
server.listen(8888);
const qs = require('querystring');

server.on('request', (req, res) => {
  const url = req.url;
  const queryString = url.substr(url.indexOf('?') + 1, url.length);
  const query = qs.parse(queryString);
  let response;

  if (url.indexOf('/hello') >= 0) {
    if (query.i_need_money === 'true' && Number(query.how_much) > 500){
      response = 'Go Away!';
    } else if (query.i_need_money === 'true' && Number(query.how_much) < 500) {
      response = 'Here You Are!';
    } else {
      response = 'Hi..How Are You.'
    }
  } else if (url.indexOf('/bye') >= 0) {
    response = 'See you..'
  }
  res.statusCode = 200;
  res.end(response)
});
