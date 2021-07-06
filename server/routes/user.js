const express=require("express");
const router=express.Router();

router.post("/signup",(req,res,next)=>{
    console.log(req.body)
    res.json({
        "name":"rinsa"    })
})

module.exports=router;
