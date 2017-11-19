var express = require('express');
var query = require('../models/others/mysql');
var router = express.Router();

var mysqlObj = require('../models/others/mysql');
var TestUser = require('../dbModel/TestUser');
var query = mysqlObj.query;
var addUser = mysqlObj.addUser;
var updateUser = mysqlObj.updateUser;
var deleteUser = mysqlObj.deleteUser;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/testDB', function(req, res, next) {
  query('select * from testusertable',function(qerr,vals,fields){
  	res.send(JSON.stringify(qerr));
  });
});

router.get('/testAdd',function(req,res,next){
	//获取时间戳
	var timestamp = Date.parse(new Date());
	timestamp = timestamp / 1000;//用时间戳来表明唯一性

	var user = new TestUser("nodeAddUser"+timestamp,1111);
	addUser(user,function(){
		res.send("testAdd调用成功");
		console.log('回调函数调用');
	});
});
router.get('/testUpdate',function(req,res,next){
	var user = new TestUser("nodeUpdateName","123","1");
	updateUser(user,function(){
		res.send("testUpdate调用成功");
		console.log("回调函数调用");
	});

});

router.get('/testDelete',function(req,res,next){
	var user = new TestUser(null,null,'2');
	deleteUser(user,function(){
		res.send("testDelete调用成功");
		console.log("回调函数调用");
	});
});
module.exports = router;
