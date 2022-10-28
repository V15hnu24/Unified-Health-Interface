const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username:{
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
    isAdmin:{
        type:Boolean,
        required:true
    },
    approved_patients:[String],
    rejected_patients:[{id:String, reason:String}],
    approved_organizations:[String],
    rejected_organizations:[{id:String, reason:String}],
    approved_doctors:[String],
    rejected_doctors:[{id:String, reason:String}]
},{timestamps:true});

module.exports = mongoose.model("admin", adminSchema);