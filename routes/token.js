const express=require('express');
const user=require('../models/user');
const router=express.Router();
require('dotenv').config()


router.get('/token',(req,res)=>{
    res.send('Token')
})

router.post('/token',async (req,res)=>{
    const {email}=req.body;
    try {
        const  emailexist=await user.findOne({email})
        if (emailexist) {
            return res.status(200).json({message:'token',userToken: emailexist.AccessToken,success:true});
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports=router;