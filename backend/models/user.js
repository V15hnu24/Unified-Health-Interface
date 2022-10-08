const mongoose = require('mongoose');
const location = require('./location');

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
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
    location:{
        type:location,
    },
    
},{timestamps:true});

module.exports = mongoose.model("paitent", patientSchema);