var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.send('respond with a resource');
});
router.get('/testDB', function(req, res, next) {
	res.send('textDB');
});

module.exports = router;
