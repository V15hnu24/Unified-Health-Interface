const express = require('express');
const med_buy_reqs = require('../models/med_buy_reqs');
const organisationSchema = require('../models/organisationSchema');
const patient = require('../models/patient');
const prescription = require('../models/prescription');
const user = require('../models/user');
const { verify_function } = require('./digital_signatures');
const payment = require('../models/payment_request');

const getAllbuyRequests = async (req, res, next) => {
    try {
        const buyRequests = await med_buy_reqs.find({organisation_id: req.body.organisation_id, status: "pending"});
        res.json({status:200, buyRequests: buyRequests});
    }
    catch (error) {
        next(error);
    }
};

const getbuyRequest = async (req, res, next) => {
    try {
        const buyRequest = await med_buy_reqs.findById(req.body.buyRequest_id);
        res.json({status:200, buyRequest: buyRequest});
    }  
    catch (error) {
        next(error);
    }
};

// const acceptBuyRequest = async (req, res, next) => {
//     try {
//         const buyRequest = await med_buy_reqs.findById(req.body.buy_req_id);

//     }
//     catch (error) {
//         next(error);
//     }
// };

const verify_prescription = async (req, res, next) => {
    try {
        const pharmacy = await organisationSchema.findById(req.body.id);
        const patient = await patient.findById(req.body.patient_id);
        const prescription = await prescription.findById(req.body.prescription_id);
        // const pendingRequests = await med_buy_reqs.find({organisation_id: req.body.id});
        const user = user.find({email:pharmacy.email});

        const data = {patient_email: patient.email, doctor_id: req.body.doctor_id, prescription_link: prescription.prescription_link, prescription_name: prescription.prescription_name};

        const signature = req.body.signature;

        const verify = verify_function(JSON.stringify(data), signature, user.publicKey);

        if(verify){
            res.json({status:200,verified:true, message:"Bill verified"});
        }else{
            res.json({status:200,verified:false, message:"Bill not verified"});
        }
    } catch (error) {
        next(error);
    }
};

const payment_request = async (req, res, next) => {
    try {
        
        const payment_req = new payment ({
            receiver_email: req.body.patient_email,
            amount: req.body.amount,
            sender_id: req.body.organisation_id,
            sender_type: "organisation"
        });
        await payment_req.save();

        res.json({status:200, message:"Payment request sent"});

    } catch (error) {
        next(error);
    }
};

module.exports = { getAllbuyRequests, getbuyRequest, verify_prescription, payment_request };
