const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    prescription_name:{
        type:String,
        required:true
    },
    patient_email:{
        type:String,
        required:true
    },
    doctor_id:{
        type:String,
        required:true
    },
    prescription_link:{
        type:String,
        required:true
    },
    // prescription_date:{
    //     type:Date,
    //     required:true
    // },
    // prescription_link:{
    //     type:String,
    //     required:true
    // },
    // prescription_description:{
    //     type:String,
    //     required:true
    // },
    // prescription_status:{
    //     type:String,
    //     required:true
    // },
    signature:{
        type:String,
    },
    access_to:{patient: [String], organisation: [String], professional: [String]}
    // access_to:[patient:[], doctor:[], organisation:[]]
}, {timestamps:true});

module.exports = mongoose.model("prescription", prescriptionSchema);