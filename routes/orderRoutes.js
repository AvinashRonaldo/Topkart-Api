const express = require('express');
const router = express.Router()
const Order = require('../models/orders')
const {isAdmin} = require('../middleware/auth');

//Get list of orders
router.get("/orders",isAdmin,async(req,res) => {
    try{
        const orders = await Order.findAll({});
        if(orders.length ==0){
            return res.send({message:'No orders available right now'});
        }
        res.send(orders);
    }catch(err){
        console.log(err);
    }
})

//Update Order by admin
router.post('/orders/"orderId',isAdmin,async(req,res) => {
    try{
        const {orderId} = req.params;
        const updates = req.body;
        const order = await Order.findByPk(orderId);
        if(!order){
            return res.status(400).send({message:'No Order found with that Id'});
        }
        Object.assign(order,updates);
        await order.save();
        res.send(order);
    } catch(err){
        console.log(err);
    }
})

module.exports = router;
