var express = require('express');
var router = express.Router();
let users = [];

/* GET home page. */
router.route('/')
  .get((req, res) => {
    // 获取并解析数据
    res.json(users)
  })
  .post((req, res) => {
    // 将数据保存,紧接着存入Users
    // 获取并解析数据
    const user = req.body;
    users.push(user);
    res.json(user)
  });

module.exports = router;
