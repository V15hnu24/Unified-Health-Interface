const express = require('express');
const crypto = require('crypto');
const user = require('../models/user');
const organisation = require("../models/organisationSchema");
const bill = require('../models/bill');
const { sign_function, verify_function } = require('./digital_signatures');
const professional = require("../models/professionalSchema");

const create_bill = async (req, res, next) => {
    try {
        const data = {patient_email: req.body.patient_email, issued_user_type:"organization", issued_user_id: req.body.organisation_id, document_link: req.body.document_link, bill_amount: req.body.bill_amount};

        const organisation = await organisation.findById(req.body.organisation_id);

        const temp_user = await user.find({email:organisation.email});
        data.bill_name = "bill issued to patient " + req.body.patient_email + " by organisation" + organisation.email;

        const signature = sign_function(JSON.stringify(data), temp_user.private_key);

        data.signature = signature;

        const newBill = new bill(data);
        await newBill.save();

        res.json({status:200,message:"Bill added"});
    } catch (error) {
        next(error);
    }
};

const verify_bill = async (req, res, next) => {
    try {
        const data = {patient_email: req.body.patient_email, issued_user_type:"professional", issued_user_id: req.body.professional_id, document_link: req.body.document_link, bill_amount: req.body.bill_amount};

        const signature= req.body.signature;
        const professional = await professional.findById(req.body.professional_id);
        const user = await user.find({email:professional.email});
        const verify = verify_function(JSON.stringify(data), signature, user.publicKey);

        if(verify){
            res.json({status:200,verified:true, message:"Bill verified"});
        }else{
            res.json({status:200,verified:false, message:"Bill not verified"});
        }

    }catch(error){
        next(error);
    }
};



module.exports = { create_bill, verify_bill };