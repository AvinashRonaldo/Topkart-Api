const sequelize  = require('../init_db')
const DataTypes = require('sequelize')
const LightDeals = require('./products');

const Order = sequelize.define('order',{
    order_id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    products:{
        type:DataTypes.ARRAY(DataTypes.UUID),
        allowNull:false
    },
    order_total:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    customer_id:{
        type:DataTypes.NUMBER,
        allowNull:false,
        defaultValue:10
    },
    order_status:{
        type:DataTypes.ENUM,
        allowNull:false,
        values:['pending','placed','cancel'],
        defaultValue:'pending'
    }
},{
    "timestamps":false
});

Order.hasMany(LightDeals,{foreignKey:'deal_id'});
LightDeals.belongsTo(Order,{foreignKey:'deal_id'});


module.exports = Order;