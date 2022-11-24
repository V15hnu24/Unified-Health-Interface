const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    patient_id:{
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
        type:String,
    }
});

module.exports = mongoose.model("bill", billSchema);
