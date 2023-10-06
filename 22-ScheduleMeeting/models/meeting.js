const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Meeting = sequelize.define('Meeting',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey : true,
        allowNull:false
    },
    Name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    emailId:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Meeting;