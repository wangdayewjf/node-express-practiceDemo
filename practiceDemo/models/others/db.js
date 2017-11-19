var setting = require('../../setting');
var mysql = require('mysql'),
	myConnection = require('express-mysql-connection'),
	dbOptions = {
	  host: setting.host,
      user: setting.user,
      password: setting.password,
      port: setting.port,
      database: 'mysql'
	};
module.exports ={
	mysql:mysql,
	myConnection:myConnection,
	dbOptions:dbOptions
}
/*var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection; 9 var Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_ PORT, {}));
*/
