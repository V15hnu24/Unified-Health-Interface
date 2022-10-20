const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    status:{
        type:Number,
        default:1
    }
    // status : 1 = pending approval
    // status : 2 = approved
    // status : 3 = rejected
    // status : 4 = blocked
},{timestamps:true});

module.exports = mongoose.model("paitent", patientSchema);