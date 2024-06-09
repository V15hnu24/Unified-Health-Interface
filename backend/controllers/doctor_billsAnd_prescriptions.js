const express = require('express');
const crypto = require('crypto');
const user = require('../models/user');
const professional = require("../models/professionalSchema");
const bill = require('../models/bill');
const { sign_function } = require('./digital_signatures');
const prescription = require('../models/prescription');
const patient = require('../models/patient');

const create_bill = async (req, res, next) => {
    try {
        const data = {patient_email: req.body.patient_email, issued_user_type:"professional", issued_user_id: req.body.professional_id, document_link: req.body.document_link, bill_amount: req.body.bill_amount};

        const professional = await professional.findById(req.body.professional_id);

        const temp_user = await user.find({email:professional.email});
        data.bill_name = "bill issued to patient " + req.body.patient_email + " by professional " + professional.email;

        const patient = await patient.find({email: req.body.patient_email});
        const signature = sign_function(JSON.stringify(data), temp_user.private_key);

        data.access_to = {patient: [patient._id], organisation: [], professional: [req.body.professional_id]};
        data.signature = signature;

        const newBill = new bill(data);
        await newBill.save();

        res.json({status:200,message:"Bill added"});
    } catch (error) {
        next(error);
    }
};

const create_prescription = async (req,res,next)=>{
    try{
        const tempprofessional = await professional.findById(req.body.doctor_id);
        const temp_user = await user.find({email:tempprofessional.email});
        const data = {patient_email: req.body.patient_email, doctor_id: req.body.doctor_id, prescription_link: req.body.prescription_link, prescription_name: "prescription issued to patient " + req.body.patient_email + " by doctor " + tempprofessional.email};
        
        const patient = await patient.find({email: req.body.patient_email});
        data.signature = sign_function(JSON.stringify(data), temp_user.privateKey);

        data.access_to = {patient: [patient._id], organisation: [], professional: [req.body.doctor_id]};
        const newPrescription = new prescription(data);
        await newPrescription.save();  
        res.json({status:200,message:"Prescription added"});
    }catch(err){
        next(err);
    }
};

const getAllPrescriptions = async (req,res,next)=>{
    try{
        const tempPrescriptions = await prescription.find({doctor_id:req.body.professional_id});
        res.json({status:200,prescriptions: tempPrescriptions});
    }catch(err){
        next(err);
    }
};

const getPrescription = async (req,res,next)=>{
    try{
        const tempPrescription = await prescription.findById(req.body.prescription_id);
        if(tempPrescription.access_to.professional.includes(req.body.professional_id)){
            res.json({status:200,prescription: tempPrescription});
        }else{
            const tempProfessional = await professional.findById(req.body.professional_id);
            tempProfessional.status = 4;
            res.json({status:201,message:"You are not authorised to view this prescription, Hence blocked by admin permanently"});
        }
    }catch(err){
        next(err);
    }
};

const getAllBills = async (req,res,next)=>{
    try{
        const tempBills = await bill.find({issued_user_type:"professional",issued_user_id:req.body.professional_id});
        res.json({status:200,Bills: tempBills});
    }catch(err){
        next(err);
    }
};

const getBill = async (req,res,next)=>{
    try{
        const tempBill = await bill.findById(req.body.bill_id);
        if(tempBill.access_to.professional.includes(req.body.professional_id)){
            res.json({status:200,Bill: tempBill});
        }else{
            const tempProfessional = await professional.findById(req.body.professional_id);
            tempProfessional.status = 4;
            res.json({status:201,message:"You are not authorised to view this bill, Hence blocked by admin permantenly"});
        }
    }catch(err){
        next(err);
    }
};


module.exports = { create_bill, create_prescription, getAllPrescriptions, getPrescription, getAllBills, getBill  };