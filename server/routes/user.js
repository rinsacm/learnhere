const express=require("express");
const bcrypt=require('bcrypt');
const dbconfig=require("../config/dbconfig");
const jwt=require("jsonwebtoken")
const router=express.Router();

router.post("/signup",(req,res,next)=>{
    console.log(req.body)
    let hashedPassword=bcrypt.hashSync(req.body.password,10);
    let newUser={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:hashedPassword
    }
    dbconfig.get().collection('users').findOne({email:newUser.email},(err,user)=>{
        if(user)
        res.status(500).json({
            
            message:"User Exists"
        })
        else
        dbconfig.get().collection('users').insertOne(newUser,(err,user)=>
{
    if(err)
    res.status(500).json({
        error:err.toString(),
        message:"Error!!"
    })
    else{
        console.log(user.ops[0]._id)
    res.status(201).json({
        user:user.ops[0]._id,
        message:"New user created"
    })
}
    })
    
})

})
router.post("/login",(req,res,next)=>{
    let {email,password}=req.body;
    console.log(req.body)
    dbconfig.get().collection('users').findOne({email:email},(err,user)=>{
        if(err){
            console.log(err)
            res.status(404).json({
                message:"Incorrect email"
            })
        }
        else if(user){
            console.log(user)
            if(bcrypt.compareSync(password,user.password)){
                let token=jwt.sign(email,process.env.TOKEN_SECRET);
                console.log(user._id)
                res.status(200).json({
                    user:user._id,
                    message:"Logged in"
                })
            }
        }
    })
})

module.exports=router;
