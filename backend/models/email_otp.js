const mongoose = require('mongoose');

const otp_schema = new mongoose.Schema({
    otp:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true});

module.expots = mongoose.model("otp", otp_schema);