const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    bill_name:{
        type:String,
        required:true
    },
    patient_email:{
        type:String,
        required:true
    },
    issued_user_type:{
        type:String,
        required:true
    },
    issued_user_id:{
        type:String,
        required:true
    },
    document_link:{
        type:String,
        required:true
    },
    bill_amount:{
        type:Number,
        required:true
    },
    // bill_date:{
    //     type:Date,
    //     required:true
    // },
    signature:{
        type:String
    },
    access_to:{patient: [String], organisation: [String], professional: [String]}
},{timestamps:true});

module.exports = mongoose.model("bill", billSchema);