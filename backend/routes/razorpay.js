const crypto =require("crypto");
const Razorpay = require('razorpay');
const express = require('express');
const bcrypt =require('bcryptjs');
const Payment = require("../models/PaymentSchema");
const router = express.Router();
const dotenv = require('dotenv').config({path:'./.env'});


const instance = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET 
})

// const checkout =require('../controllers/paytmController');
router.post("/checkout",async(req,res)=>{

       const options = {
           amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
           currency: "INR",
           receipt: "order_rcptid_11"
       };
       const order = await instance.orders.create(options);
       res.status(200).json({
           success:true,
           order,
       })
});
router.post("/paymentVerification",async (req,res)=>{

   res.status(200).json({
       success:true,
   })
    
});
router.get("/getKey", async (req,res)=>{
       res.status(200).json({key:process.env.RAZORPAY_API_KEY});
})

module.exports = router;
