const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PaymentSchema = new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        reuired:true
    },
    razorpay_payment_id:{
        type:String,
        reuired:true
    },
    razorpay_signature:{
        type:String,
        reuired:true
    },
},{timestamps:true});



const Payment = mongoose.model('PAYMENT',PaymentSchema)
// module.exports = User;
module.exports =Payment;    // If it open , not able to do patient login