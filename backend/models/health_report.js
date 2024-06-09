const mongoose = require('mongoose');

const health_report_schema = new mongoose.Schema({
    report_name:{
        type:String,
        required:true
    },
    patient_email:{
        type:String,
        required:true
    },
    organisation_id:{
        type:String,
        required:true
    },
    report_link:{
        type:String,
        required:true
    },
    signature:{
        type:String,
    },
    access_to:{patient: [String], organisation: [String], professional: [String]}
}, {timestamps:true});

module.exports = mongoose.model("health_report", health_report_schema);