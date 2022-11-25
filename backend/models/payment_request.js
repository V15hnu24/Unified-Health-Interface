const mongoose = require('mongoose');

const payment_request = new mongoose.Schema({
    receiver_email:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    sent_by_user_type:{
        type:String,
        required:true
    },
    sent_by_user_id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
});

module.exports = mongoose.model("payment_request", payment_request);