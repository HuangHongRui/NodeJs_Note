/*
KeyWord: 流 | Buffer
当用户传输的数据过大.
选择　把　一部分数据存起来.然后释放其内存.
 */
const http = require('http');
const server =http.createServer();
server.listen(8888);
const qs = require('querystring');
let users = [];

server.on('request', (req, res) => {
  const url = req.url;
  const path = url.substr(0, url.indexOf('?'));
  const queryString = url.substr(url.indexOf('?') + 1, url.length);

  switch (path) {
    case '/user':
      switch (req.method) {
        case 'GET':
          res.statusCode = 200;
          res.end(JSON.stringify(users));
          break;
        case 'POST':
          let dataCount = 0; //　Ｔｅｓｔ: 收到多少小块数据.
          req.on('data', data => {
            dataCount++;
            console.log('☞☞☞ 9527 [4]_simple_none_server 37', data); //　会打印出　ＢＵＦＦＥＲ
            // <Buffer 7b 0a 09 22 6e 61 6d 65 22 3a 20 22 48 75 61 6e 67 48 4f 4e 47 52 55 49 22 2c 0a 09 22 61 67 65 22 3a 20 33 30 0a 7d>
          });
          req.on('end', () => {
            console.log('☞☞☞ 9527 [4]_simple_none_server 45', dataCount); //　Print Data块的数量
            res.end('Done')
          });
          break;
      }
      break;
    default:
      res.statusCode = 404;
      res.end('Not Found')
  }
});
/*
试图使用传送一个几十M的文件.可看到Print出很多Buffer块和最终的 dataCount 的数量.

可以理解为：
当有一个面积大的数据需要传输时..=== [装满水的大水缸]
我们使用一个小桶去挑..一点一点的挑出来. === [Buffer]

*/

