const express=require("express");
const bcrypt=require('bcrypt');
const dbconfig=require("../config/dbconfig")
const router=express.Router();

router.post("/signup",(req,res,next)=>{
    console.log(req.body)
    let hashedPassword=bcrypt.hashSync(req.body.password,10);
    let newUser={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
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
        console.log(user.id)
        console.log(user.ops[0]._id)
    res.status(201).json({
        user:user.ops[0]._id,
        message:"New user created"
    })
}
    })
    
})

})

module.exports=router;
