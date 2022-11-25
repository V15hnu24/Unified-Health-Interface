const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patient_email:{
        type:String,
        required:true
    },
    doctor_id:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    prescription_date:{
        type:Date,
        required:true
    },
    prescription_link:{
        type:String,
        required:true
    },
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
    }
}, {timestamps:true});

module.exports = mongoose.model("prescription", prescriptionSchema);