const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    user_type:{
        type:String,
        required:true
    },
    otp:{
        type:Number
    }
});