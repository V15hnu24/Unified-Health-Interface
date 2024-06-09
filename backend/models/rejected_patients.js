const mongoose = require('mongoose');

const rejected_patientSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    admin_id:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("rejected_patient", rejected_patientSchema);