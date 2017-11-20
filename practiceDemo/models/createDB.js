var sequelize = require('./localSequelize');
var User = sequelize.import('./user');
var UserCheckin = sequelize.import('./userCheckin');
var UserAddress = sequelize.import('./userAddress');
var Role = sequelize.import('./role');

// 建立模型之间的关系
User.hasOne(UserCheckin);
UserCheckin.belongsTo(User);
User.hasMany(UserAddress, {foreignKey:'user_id', targetKey:'id', as:'Address'});
User.belongsToMany(Role, {through: 'userRoles', as:'UserRoles'});
Role.belongsToMany(User, {through: 'userRoles', as:'UserRoles'});

sequelize.sync({force: false});