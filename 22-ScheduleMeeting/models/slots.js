const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Slots = sequelize.define('Slot',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey : true,
        allowNull:false
    },
    time:{
        type:Sequelize.TIME,
        allowNull:false
    },
    noOfslot:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports = Slots;