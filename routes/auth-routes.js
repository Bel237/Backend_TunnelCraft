const express=require('express');
const bcrypt=require('bcryptjs')
const user=require('../models/user');
const jwt=require('jsonwebtoken')
const router=express.Router();
require('dotenv').config()

//Spécification des routes
router.get('/register',(req,res)=>{
    res.send('PAGE D\'INSCRIPTION')
})
router.post('/register',async (req,res)=>{
    const {username,email,password}=req.body;

    try{
        //utilisateur existe
        const UserExist=await user.findOne({username});
        const EmailExist=await user.findOne({email})
        if (UserExist || EmailExist) {
            return res.status(400).json({message:'Cet utilisateur existe déjà!!!',success: false});
        }
        //enregistrement d'un utilisateur
        else{
            const accessToken=jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
            const hashedPassword=await bcrypt.hash(password,10)
            const newUser=new user({username,email,password:hashedPassword,AccessToken:accessToken})
            await newUser.save()
            res.status(201).json({message:'Utilisateur enregistré avec succès',success: true})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Erreur durant l\'enregistrement'})
    }
})

router.get('/login',(req,res)=>{
    res.send('PAGE DE CONNEXION')
})
router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    try{
        //verification si l'utilisateur existe
        const check=await user.findOne({email:email});
        if (check.email){
            const result= await bcrypt.compare(password,check.password)
            if (result) {
               return res.status(201).json({message:'Connexion Reussie', success: true});
            } else {
                return res.status(201).json({message:'Mot de passe incorrect', success: false});
            }
        }else{
            return res.status(401).json({message:'Cet utilisateur n\'existe pas'});
        }
        

    }catch(error){
        console.log(error);
        res.status(500).json({message:'Erreur durant la connexion'})
    }
})

module.exports=router;