const express = require('express');
const crypto = require('crypto');
const user = require('../models/user');
const professional = require("../models/professionalSchema");
const bill = require('../models/bill');
const { sign_function } = require('./digital_signatures');

const create_bill = async (req, res, next) => {
    try {
        const data = {patient_email: req.body.patient_email, issued_user_type:"professional", issued_user_id: req.body.professional_id, document_link: req.body.document_link, bill_amount: req.body.bill_amount};

        const professional = await professional.findById(req.body.professional_id);

        const temp_user = await user.find({email:professional.email});
        data.bill_name = "bill issued to patient " + req.body.patient_email + " by professional " + professional.email;

        const signature = sign_function(JSON.stringify(data), temp_user.private_key);

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

        
        // newPrescription.prescription_status = req.body.prescription_status;

        
        const professional = await professional.findById(req.body.doctor_id);
        const temp_user = await user.find({email:req.body.professional.email});

        // To save document for doctor side
        // const doc = new document();
        // doc.user_id = req.body.doctor_id;
        // doc.user_type = "professional";
        // doc.document_name = "prescription issued to patient " + req.body.patient_email;
        // doc.document_type = "prescription";
        // doc.document = req.body.prescription_link;
        // doc.access_to = [{user_type:"patient",user_email:req.body.patient_email}];
        // await doc.save();

        // To save document for patient
        // const t_patient = await patient.find({email:req.body.patient_email});
        // const doc_p = new document();
        // doc_p.user_id = t_patient._id;
        // doc_p.user_type = "patient";
        // doc_p.document_name = "prescription issued by patient doctor" + professional.email;
        // doc_p.document_type = "prescription";
        // doc_p.document = req.body.prescription_link;
        // doc_p.access_to = [{user_type:"professional",user_email:professional.email}];
        // await doc_p.save();

        const data = {patient_email: req.body.patient_email, doctor_id: req.body.doctor_id, prescription_link: req.body.prescription_link, prescription_name: "prescription issued to patient " + req.body.patient_email + " by doctor " + professional.email};

        data.signature = sign_function(JSON.stringify(data), temp_user.private_key);
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
        res.json({status:200,prescription: tempPrescription});
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
        res.json({status:200,Bill: tempBill});
    }catch(err){
        next(err);
    }
};


module.exports = { create_bill, create_prescription, getAllPrescriptions, getPrescription, getAllBills, getBill };