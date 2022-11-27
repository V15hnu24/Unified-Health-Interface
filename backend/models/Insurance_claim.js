const mongoose = require('mongoose');

const insuramceClaims = mongoose.Schema({
    patient_id:{
        type:String,
        required:true
    },
    organisation_id:{
        type:String,
        required:true
    },
    bill_id:{
        type:String,
        required:true
    },
    status: {
        type:String,
        default: "pending"
    }
});

module.exports = mongoose.model('insurance_claims', insuramceClaims);