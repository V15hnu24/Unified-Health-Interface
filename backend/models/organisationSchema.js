const mongoose = require('mongoose');   
const organisationSchema = new mongoose.Schema({
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
    description: {
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
    location: {
        type:String
    },
    // status 1: to be approved
    // status 2: approved
    // status : 3 = rejected
    // status : 4 = blocked 
    status:{
        type:Number,
        default:1
    },
    organisationType: {
        type: String,
        enum : ['Insurance_firms','Hospital','Pharmacy'],
        default: 'Pharmacy'
    },

},{timestamps:true});

module.exports = mongoose.model("organisations", organisationSchema);

