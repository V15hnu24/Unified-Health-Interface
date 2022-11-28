const mongoose = require('mongoose');   
const professionalSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
       required:true
   },
    phone: {
        type: Number,
        required:true
    },
    user_type: {
        type: String
    },
    qualification: {
         type: String,
        required:true
    },
    gender: {
        type: String,
       required:true
   },
   dob: {
         type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    pincode: {
        type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    registration_documents:{
        type:[String]
    },
    status:{
        type:Number,
        default:1
    }
},{timestamps:true});

module.exports = mongoose.model("professionals", professionalSchema);

