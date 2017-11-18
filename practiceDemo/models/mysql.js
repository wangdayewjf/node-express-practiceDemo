
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
var pool = mysql.createPool(dbP);//连接池连接数据库
//监听connection事件
pool.on('connection', function(connection) {
    //这里可以做出一些同时的操作？
    //connection.query('SET SESSION auto_increment_increment=1'); 
});

//创建单连接对象
//单连接对象放到代码块里创建，由于是一次性的，用完就释放。


//连接数据库集群

//mycat搭建数据库集群，之后再弄。需要好几个数据库服务器。


var query = function(sql,callback){

    //连接池操作
	pool.getConnection(function(err,conn){
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,function(qerr,vals,fields){
                    //释放连接到连接池
                    conn.release();
                    //事件驱动回调
                    callback(qerr,vals,fields);
                });
            }
        });//连接池连接

     //单连接操作,单连接，得不断新建立connection对象，所以connection对象放到函数快里面
     // var connection = mysql.createConnection(dbP);
     // connection.connect();//开启连接
     // connection.query(sql,function selectCb(err, results, fields) {
     //     console.log('单独连接');
     //     connection.end(); //关闭连接
     // });

};

var addUser = function(user,callback){

    let sql = 'INSERT INTO testusertable(name,password) VALUES(?,?)';
    //连接池插入操作
    pool.getConnection(function(err,conn){
            let paramArr = [];
            paramArr.push(user.name);
            paramArr.push(user.password);
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,paramArr,function(qerr,vals,fields){
                    //释放连接到连接池
                    conn.release();
                    //事件驱动回调
                    callback(qerr,vals,fields);
                });
            }
        });//连接池连接

    //单连接插入操作
    // try{
    //     var connection = mysql.createConnection(dbP);
    //     connection.connect();//开启连接
    //     let paramArr = [];
    //     paramArr.push(user.name);
    //     paramArr.push(user.password);
    //     connection.query(sql,paramArr,function (err, result) {
    //         if(!err){
    //             console.log('单连接插入成功');
    //         }
    //         callback();
    //         connection.end();
    //     });
    // }catch(err){
    //     console.log(err);
    // }

}

var deleteUser = function(user,callback){
    let sql = "delete from testusertable where id = ?";
    //连接池插入操作
    pool.getConnection(function(err,conn){
            let paramArr = [];
            paramArr.push(user.name);
            paramArr.push(user.password);
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,paramArr,function(qerr,vals,fields){
                    //释放连接到连接池
                    conn.release();
                    //事件驱动回调
                    callback(qerr,vals,fields);
                });
            }
        });//连接池连接

    //单连接操作
    // var connection = mysql.createConnection(dbP);
    // connection.connect();//开启连接
    // let paramArr = [];
    // paramArr.push(user.id);
    // connection.query(sql,paramArr,function (err, result) {
    //     if(!err){
    //         console.log('单连接删除成功');
    //     }
    //     callback();
    //    // connection.end();
    // });


}

var updateUser = function(user,callback){
    let sql = 'update testusertable set name=?,password=? where id=?';

    //连接池插入操作
    pool.getConnection(function(err,conn){
            let paramArr = [];
            paramArr.push(user.name);
            paramArr.push(user.password);
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,paramArr,function(qerr,vals,fields){
                    //释放连接到连接池
                    conn.release();
                    //事件驱动回调
                    callback(qerr,vals,fields);
                });
            }
        });//连接池连接

    //单连接
    // var connection = mysql.createConnection(dbP);
    // connection.connect();//开启连接
    // let paramArr = [];
    // paramArr.push(user.name);
    // paramArr.push(user.password);
    // paramArr.push(user.id);
    // connection.query(sql,paramArr,function (err, result) {
    //     if(!err){
    //         console.log('单连接更新成功');
    //     }
    //     callback();
    //     //connection.end();
    // });
}
module.exports ={
    query:query,
    addUser:addUser,
    updateUser:updateUser,
    deleteUser:deleteUser
};