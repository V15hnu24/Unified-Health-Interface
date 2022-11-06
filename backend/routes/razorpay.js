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
       console.log(order);
       res.status(200).json({
           success:true,
           order,
       })
});
router.post("/paymentVerification",async (req,res)=>{
   console.log(req.body);

   const {razorpay_order_id ,razorpay_payment_id,razorpay_signature } =req.body;


   const body=razorpay_order_id + "|" + razorpay_payment_id;

   const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                   .update(body.toString())
                                   .digest('hex');
                                   console.log("sig received " ,razorpay_signature);
                                   console.log("sig generated ",expectedSignature);
   const isAuthenticated =expectedSignature===razorpay_signature;

   if(isAuthenticated)
   {
       // Database comes here

       await Payment.create({
           razorpay_order_id ,
           razorpay_payment_id,
           razorpay_signature 
       })

       // res.redirect(`http://localhost:3000/PaymentSuccess?reference=${razorpay_payment_id}`);
   }
   else{
       res.status(200).json({
           success:false,
       }) 
   }

   res.status(200).json({
       success:true,
   })
});
router.get("/getKey", async (req,res)=>{
       res.status(200).json({key:process.env.RAZORPAY_API_KEY});
})

module.exports = router;
