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
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    pincode:{
        type:String
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