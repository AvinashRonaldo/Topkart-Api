const sequelize = require('../init_db');
const {DataTypes, Sequelize} = require('sequelize');


/*const Product = sequelize.define("product",{
    prod_id:{
        type:DataTypes.UUID,
        primaryKey : true,
        defaultvalue:DataTypes.UUIDV4
    },
    prod_name : {
        type:DataTypes.STRING,
        allowNull : false,
        unique :true
    },
    prod_price :{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    prod_quantity:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    },
    {
       "timestamps":false
    }
);  */

const Lightdeals = sequelize.define("lightdeal",{
    deal_id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    prod_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    orig_price:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    deal_price:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    deal_start_time:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    deal_expiry_time:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            mustBeGreater(value){
                if(value<this.deal_start_time){
                    throw new Error("Expiry time must be greater")
                }
            }
        }
    },
    deal_quantity:{
        type:DataTypes.NUMBER,
        allowNull:false
    }
    },{
    "timestamps":false,
    /*validate:{
        dealExpiryWithin12(){
            if(this.deal_expiry_time - this.deal_start_time > 12){
                throw new Error("Expiry time must be within 12 hours of start time")
            }
        }
    }*/
});

//Product.hasOne(Lightdeals);
//Lightdeals.belongsTo(Product);


module.exports =  Lightdeals;