
var db = require('./db');
var mysql = require('mysql');
var dbOptions=db.dbOptions;
var dbP = {
 host:dbOptions.host,
 user:dbOptions.user,
 password:dbOptions.password,
 database:dbOptions.database,
 port:dbOptions.port

};
//创建连接池对象
//var pool = mysql.createPool(dbP);//连接池连接数据库

//创建单连接对象
//单连接对象放到代码块里创建，由于是一次性的，用完就释放。


//连接数据库集群


var query = function(sql,callback){

    //连接池操作
	// pool.getConnection(function(err,conn){
     //        if(err){
     //            callback(err,null,null);
     //        }else{
     //            conn.query(sql,function(qerr,vals,fields){
     //                //释放连接到连接池
     //                conn.release();
     //                //事件驱动回调
     //                callback(qerr,vals,fields);
     //            });
     //        }
     //    });//连接池连接

     //单连接操作,单连接，得不断新建立connection对象，所以connection对象放到函数快里面
     var connection = mysql.createConnection(dbP);
     connection.connect();//开启连接
     connection.query(sql,function selectCb(err, results, fields) {
         console.log('单独连接');
         connection.end(); //关闭连接
     });

};

var addUser = function(user,callback){
    //单连接插入操作
    let sql = 'INSERT INTO testusertable(name,password) VALUES(?,?)';
    try{
        var connection = mysql.createConnection(dbP);
        connection.connect();//开启连接
        let paramArr = [];
        paramArr.push(user.name);
        paramArr.push(user.password);
        connection.query(sql,paramArr,function (err, result) {
            if(!err){
                console.log('单连接插入成功');
            }
            callback();
            connection.end();
        });
    }catch(err){
        console.log(err);
    }

}

var deleteUser = function(user,callback){
    let sql = "delete from testusertable where id = ?";
    var connection = mysql.createConnection(dbP);
    //单连接
    connection.connect();//开启连接
    let paramArr = [];
    paramArr.push(user.id);
    connection.query(sql,paramArr,function (err, result) {
        if(!err){
            console.log('单连接删除成功');
        }
        callback();
       // connection.end();
    });


}

var updateUser = function(user,callback){
    let sql = 'update testusertable set name=?,password=? where id=?';
    //单连接
    var connection = mysql.createConnection(dbP);
    connection.connect();//开启连接
    let paramArr = [];
    paramArr.push(user.name);
    paramArr.push(user.password);
    paramArr.push(user.id);
    connection.query(sql,paramArr,function (err, result) {
        if(!err){
            console.log('单连接更新成功');
        }
        callback();
        //connection.end();
    });
}
module.exports ={
    query:query,
    addUser:addUser,
    updateUser:updateUser,
    deleteUser:deleteUser
};