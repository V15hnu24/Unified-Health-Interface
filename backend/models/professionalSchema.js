const mongoose = require('mongoose');   
const professionalSchema = new mongooose.Schema({
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
    qualification: {
         type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    register_documents:{
        type:String
    },
    // status 1: to be approved
    // status 2: approved
    // status : 3 = rejected
    // status : 4 = blocked 
    status:{
        type:Number,
        default:1
    }
},{timestamps:true});

module.exports = mongoose.model("professionals", professionalSchema);

