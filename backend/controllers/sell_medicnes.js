const express = require('express');
const med_buy_reqs = require('../models/med_buy_reqs');
const organisationSchema = require('../models/organisationSchema');
const patient = require('../models/patient');
const prescription = require('../models/prescription');
const user = require('../models/user');

const verifyPrescription = () => {

}

const getAllMedBuyRequests = async (req, res, next) => {
    try {
        
        const pharmacy = await organisationSchema.findById(req.body.id);
        const patient = await patient.findById(req.body.patient_id);
        const prescription = await prescription.findById(req.body.prescription_id);
        const pendingRequests = await med_buy_reqs.find({organisation_id: req.body.id});
        const user = user.find({email:professional_email})

        const data = {patient_email: patient.email, doctor_id: req.body.doctor_id, prescription_link: prescription.prescription_link, prescription_name: prescription.prescription_name};



        const verify = verifyPrescription(data, );


    } catch (error) {
        next(error);
    }
};