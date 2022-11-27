const mongoose = require('mongoose');

const blocked_patinetSchema = new mongoose.Schema({
    patient_id:{
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

module.exports = mongoose.model("blocked_patient", blocked_patinetSchema);