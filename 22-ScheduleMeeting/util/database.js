const Sequelize = require('sequelize');
const sequelize = new Sequelize('schedule-project','root','T#9758@qlph',{
    dialect:'mysql',
    host:'localhost',
    logging:false
});
module.exports = sequelize;