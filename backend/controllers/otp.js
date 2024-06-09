const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const process = require('process');
const user = require("../models/user");

const email_otp = async (req,res,next) =>{
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const email = req.body.email;
        const tempUser = await user.findOne({email:email});
        if(tempUser){
            tempUser.otp = otp;
            await tempUser.save();
        }
        else{
            const newUser = new user({
                email:email,
                otp:otp
            });
            await newUser.save();
        }
        try {
            email_otp_sender(otp, email);
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

const verify_otp = async (req,res,next) =>{
    try {
        const otp = req.body.otp;
        const email = req.body.email;
        const tempUser = await user.findOne({email:email});
        if(tempUser){
            if(tempUser.otp == otp){
                res.status(200).json({message:"OTP verified"});
            }
            else{
                res.status(400).json({message:"OTP incorrect"});
            }
        }
        else{
            res.status(400).json({message:"User not found"});
        }
    } catch (error) {
        next(error);
    }
};


async function email_otp_sender(otp, email) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "patientservicesfcsiiitd@gmail.com", // generated ethereal user
      pass: process.env.email_password, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Otp data security services" <no-reply@datasecurity.com>', // sender address
    to: email, // list of receivers
    subject: "OTP from Patient data management system", // Subject line
    text: "OTP is " + otp // plain text body
    // html: "<b>Hello world </b>", // html body
  });
};

module.exports = {email_otp, verify_otp};