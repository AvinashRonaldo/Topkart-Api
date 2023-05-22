const router = require('express').Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');

//register a user
router.post("/register",async(req,res) => {
    try{
    const uname = req.body.user_name;
    const pass = req.body.password;
    const email = req.body.user_email;
    const isAdm = req.body.isAdmin;
    if(!uname | !pass | !email ){
        return res.status(400).send({message:"Please provide enough details"})
    }
    const user =await User.findOne({
        where:{
            user_name:uname
        }
    });
    console.log(user);
    if(user){
        return res.status(400).send({message:"User is Present with that username.Please change it"})
    }
    else{
        const newUser = await User.create({user_name:uname,user_email:email,password:pass,isAdmin:isAdm});
        res.send(`A User created with id ${newUser.user_id}`);
    }
    }catch(err){
        console.log(err);
    }
});


//Login user
router.post("/login",async(req,res) => {
    try{
    const uname = req.body.user_name;
    const pass = req.body.password;
    const user = await User.findOne({
        where:{
            user_name:uname
        }
    });
    if(!user){
        return res.status(400).send({message:"User not found with that username"})
    }
    console.log(user);
    /*const [user,metadata ] = await sequelize.query('SELECT user_id,user_name,user_email,password,isAdmin from users where user_name=?',{
        replacements:[uname],type: QueryTypes.SELECT
    });*/
    if(user.password != pass){
        res.status(400).json({message : "Invalid Credentials"});
    }
    else{
        const IsAdmin = user.isAdmin;
        const uId = user.uesr_id;
        const payload = {
            uname,
            uId,
            IsAdmin
        }
        const token = jwt.sign(payload,process.env.SECRET_KEY);
        res.send(token);
    }
    }catch(err){
        console.log(err);
    }
});

module.exports = router;