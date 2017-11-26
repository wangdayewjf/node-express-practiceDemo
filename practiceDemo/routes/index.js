var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/index2',function(req, res, next){
	res.render('index2');
});//websocket工具
router.get('/socketIndex',function(req, res, next){
	res.render('socketIndex');
});//socket.io工具
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});//index为原始websocket


module.exports = router;
