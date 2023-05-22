const {DataTypes} = require('sequelize');
const sequelize = require('../init_db');


const User = sequelize.define('user',{
    user_id : {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    user_name :{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    user_email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
},
{
    "timestamps":false
})

module.exports = User;