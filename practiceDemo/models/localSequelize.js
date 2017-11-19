var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    'mysql',    //数据库名
    'root',             //用户名
    '051388698738Wjf',             //密码
    {
        'dialect': 'mysql',
        'host': 'gz-cdb-039h75dd.sql.tencentcdb.com',
        'port': 63681
    }
);
console.log('require sequelize');
module.exports = sequelize;