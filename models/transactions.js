const mongoose=require('mongoose');

const TransModel=new mongoose.Schema({
    username:String,
    dateTransaction:String,
    id:String,
    Amount:Number,
    Operator:String,
    Subscription:String
});

module.exports=mongoose.model('Transaction',TransModel);