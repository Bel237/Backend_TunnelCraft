const mongoose=require('mongoose');

const UserModel=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    AccessToken:String
});

module.exports=mongoose.model('User',UserModel);