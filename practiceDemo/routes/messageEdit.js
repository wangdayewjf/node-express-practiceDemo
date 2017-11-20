var express = require('express');
var router = express.Router();
var Message = require("../models/message");

router.get('/', function(req, res, next) {
	res.render('add');
    // res.send('respond with a resource from Test');
});
router.get('/show', function(req, res, next) {
	Message.findAll().then(function(msgs) {
         res.send(JSON.stringify(msgs));
    });
});
router.get('/delete', function(req, res, next) {

});

router.post('/add', function(req, res, next) {
	//如果没有post数据或者数据为空,直接返回
    if (req.body.username == undefined ||req.body.username == ''
        || req.body.content == undefined || req.body.content == '') {
        res.render('404', {});
        return;
    }
    var message = {
        username: req.body.username,
        content: req.body.content
    };
    //创建一条记录,创建成功后跳转回首页
    Message.create(message).then(function(msg){
        console.log(msg);
        res.redirect('/');
    }).catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });
});

module.exports = router;
