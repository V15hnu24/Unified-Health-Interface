const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        // unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
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
        type:String,
        required:true
    },
    registration_documents:[String],
    gender:{
        type:String
    },
    // Not for frontend: Not for body 
    status:{
        type:Number,
        default:1
    },
    dob:{
        type:String  
    },
    otp:{
        type:Number
    }
    // status : 1 = pending approval
    // status : 2 = approved
    // status : 3 = rejected
    // status : 4 = blocked
},{timestamps:true});

module.exports = mongoose.model("paitent", patientSchema);