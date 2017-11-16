
var db = require('./db');
var mysql = require('mysql');
var pool = mysql.createPool({
	host:dbOptions.host,
	user:dbOptions.user,
	password:dbOptions.password,
	database:'database',
	port:dbOptions.port

});

var query = function(sql,callBack){
	pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
}

module.exports =query;