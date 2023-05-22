const express = require('express');
const router = express.Router()
const LightDeals = require('../models/products');
const Order = require('../models/orders');
const { Sequelize } = require('sequelize');
const {isAdmin,isAuthenticated} = require('../middleware/auth');

//Function to create Order
async function createOrder(ldeals,cust_id){
    try{
        let total =0;
        for(let i=0;i<ldeals.length;i++){
            total+=ldeals[i]['deal_price'];
        }
        ldeals = ldeals.map(ldeal => {
            return ldeal.deal_id;
        });
        const newOrder = await Order.create({products:ldeals,order_total:total,customer_id:cust_id});
        return newOrder;
    } catch(err){
    console.log(err);
}
}

//Get all unexpired Lightning Deals
router.get('/lightningDeals',isAuthenticated,async(req,res) => {
    try{
    const currentDate = new Date();
    const ldeals = await LightDeals.findAll({
        where: {
            deal_expiry_time: {
                [Sequelize.Op.gte]: currentDate
            },
            deal_quantity: {
                [Sequelize.Op.gt]: 0
            }
        }
    });
    if(ldeals.length==0){
        return res.status(400).send({message:'No Lightning Deals available!Come back later'});
    }
    res.send(ldeals);
    }catch(err){
        console.log(err);
    }
})

//Create a Lightning Deal
router.post('/lightningDeals',isAdmin,async(req,res) => {
    try{
        const ldeal = await LightDeals.create(req.body);
        res.send(ldeal);
    }catch(err){
        console.log(err);
    }
})


//Place Order which contains  deals
router.post('/lightningDeals/buy',isAuthenticated,async(req,res) => {
    try{
        const deals = req.body;
        const cust_id = req.user.uId;
        let ldeals = [];
        for(const deal of deals){
           const {deal_id,quantity} = deal;
            const ldeal = await LightDeals.findByPk(deal_id);
            if(!ldeal){
                return res.status(400).send({message:`Deal with ${deal_id} not found`});
            }
            if(Date(ldeal['deal_expiry_time']) < Date.now()){
                return res.status(400).send({message:"Lightning Deal expired for one of items.please remove it and place order"})
            }
            if(ldeal['deal_quantity'] < quantity){
                return res.status(400).send({message:"Quantity not available"});
            }
            const updatedQuantity = ldeal['deal_quantity'] - quantity ;
            await ldeal.update({deal_quantity: updatedQuantity});
            await ldeal.save();
            ldeals.push(ldeal);
        }
        let order = await createOrder(ldeals,cust_id);
        res.status(200).send(`order placed ,reference Id: ${order.order_id}`)
    }catch(err){
        console.log(err);
        res.status(404).json({'message':err.message})
        console.log(err);
    }
})

//Modify/Update a Lightning deal
router.put("/lightningDeals/:id",isAdmin,async(req,res) => {
    try{
        const {id} = req.params;
        const updates = req.body;
        const deal = await LightDeals.findByPk(id);
        if(!deal){
            return res.status(400).send({message:'No deal found with that Id'});
        }
        Object.assign(deal,updates);
        await deal.save();
        res.send(`deal with id ${id} updated successfully`);
    } catch(err){
        console.log(err);
    }
})


module.exports = router;