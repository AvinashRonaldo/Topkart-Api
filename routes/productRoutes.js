/*const express = require('express')
const router = express.Router()
const {Product} = require('../models/products')

router.get("/products",async(req,res) => {
    try{
        const prods= await Product.findAll({});
        res.send(prods);
    }
    catch(err){
        console.log(err);
    }
})

router.post("product",async(req,res) => {
    try{
        const product = await Product.create(req.body);
        res.send(product);
    }catch(err){
        console.log(err);
    }
});

module.exports = router; */