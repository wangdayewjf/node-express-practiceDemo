var express = require('express');
var query = require('../models/mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/testDB', function(req, res, next) {
  query('select * from testusertable',function(qerr,vals,fields){
  	res.send(JSON.stringify(qerr));
  	res.send(stringify(vals));
  	res.send(stringify(fields));
  });
});

module.exports = router;
