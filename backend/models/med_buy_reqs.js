const mongoose = require('mongoose');

const buy_reqs = new mongoose.Schema({
    patient_id:{
        type:String,
        required:true
    },
    organisation_id:{
        type:String,
        required:true
    },
    prescription_id:{
        type:String,
        required:true
    },
    status: {
        type:String,
        default: "pending"
    },
    access_to:{patient: [String], organisation: [String], professional: [String]}
}, {timestamps:true});

module.exports = mongoose.model("med_buy_reqs", buy_reqs);
