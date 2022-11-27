const bill = require("../models/bill");
const organisationSchema = require("../models/organisationSchema");
const patient = require("../models/patient");
const payment_request = require("../models/payment_request");
const prescription = require("../models/prescription");
const rejected_patients = require("../models/rejected_patients");
const { sign_function } = require("./digital_signatures");
const professional = require("../models/professional");
const med_buy_reqs = require("../models/med_buy_reqs");
const med_buy_reqs = require("../models/med_buy_reqs");
const Insurance_claim = require("../models/Insurance_claim");
const health_report = require("../models/health_report");

const bill_claim_request = async (req,res,next)=>{
    try {
        const firm = await organisation.find({email: req.body.organisation_email});
        const insuramceClaim = new Insurance_claim({
            patient_id: req.body.patient_id,
            bill_id: req.body.bill_id,
            organisation_id: firm._id
        });
        await insuramceClaim.save();
        
        res.json({status:200,message:"Insurance claim request sent to organisation"});
    }catch (error) {
        next(error);
    }
};

const buy_medicine = async (req,res,next)=>{
    try {
        
        // const patient = await patient.findById(req.body.patient_id);
        const prescription = await prescription.findById(req.body.prescription_id);
        const pharmacy = await organisation.find({email: req.body.pharmacy_email});
        // const doctor = await professional.findById({email: req.body.doctor_email});
        const med_buy_reqs = new med_buy_reqs({
            patient_id: req.body.patient_id,
            prescription_id: req.body.prescription_id,
            organisation_id: pharmacy._id,
        });

        await med_buy_reqs.save();
        res.json({status:200,message:"Medicine buy request sent to pharmacy"});

    } catch (error) {
        next(error);
    }
};
 
const updatePatient = async (req,res,next)=>{
   console.log("In put of User");
    try{
        const updatePatient = await patient.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.json({status:200,updateUser});
    }catch(err){
        next(err);
    }
};

const getAllPaymentreqs = async (req,res,next)=>{
    try {
        const new_paitent = await patient.findById(req.params.id);
        const payment_req = await payment_request.find({receiver_email:new_patient.email, status:"pending"});
        res.json({status:200,payment_reqs: payment_req});

    } catch (error) {
        next(error);
    }

};

const deletePatient = async(req,res,next) =>{
    try {
        await patient.findByIdAndDelete(req.params.id);
        // res.status(200).json("User has been deleted");
        res.json({status:200,message:"User has been deleted"});
    } catch (error){
        next(err);
    }
};

const getPatient = async (req,res,next)=>{
    // console.log("IN get of User");
    try{
        const tempPatient = await patient.findById(req.params.id);
        res.json({status:200,tempPatient});
    }catch(err){
        next(err);
    }
};

const getAllVerifiedPatients = async (req,res,next)=>{
    try{
        const allPatients = await patient.find({status:2});
        // res.status(200).json(allPatients);
        res.json({status:200,allPatients});
    }catch(err){
        next(err);
    }
};

const getAllRejectedPatients = async (req,res,next)=>{
    try{
        const allPatients = await rejected_patients.find({status:3});
        // res.status(200).json(allPatients);
        res.json({status:200,allPatients});
    }catch(err){
        next(err);
    }
};

const getAllPendingforApproval_patients = async (req,res,next)=>{
    try{
        const allPatients = await patient.find({status:1});
        // res.status(200).json(allPatients);
        res.json({status:200,allPatients});
    }catch(err){
        next(err);
    }
};

const getAllPatients = async (req,res,next)=>{
    try{
        const allPatients = await patient.find();
        // res.status(200).json(allPatients);
        res.json({status:200,allPatients});
    }catch(err){
        next(err);
    }
};

const getAlldocuments = async (req,res,next)=>{
    try{
        const getPatient = await patient.findById(req.params.id);
        const allDocuemts = await document.find({user_id:req.params.id});
        // res.status(200).json(allDocuemts);
        const health_reports = await health_report({patient_email: getPatient.email});
        const allprescriptions = await prescription.find({patient_email: getPatient.email});
        const allbills = await bill.find({patient_email: getPatient.email});
        res.json({status:200,documents: allDocuemts, prescriptions: allprescriptions,bills: allbills, reports: health_reports});
    }catch(err){
        next(err);
    }
};

const updateDocumentAccess = async (req,res,next)=>{
    try{
        const doc_ids = req.body.document_ids;
        for (let index = 0; index < docs_ids.length; index++) {
            const doc_id = docs_ids[index];
            const updateDocument = await document.findById(doc_id);
            const ary = updateDocument.access_to;
            ary.push({user_type:req.body.user_type, user_email:req.body.access_email});
            await document.findByIdAndUpdate(req.params.id,{$set:{access_to:ary}},{new:true});
        }
        // res.status(200).json(set_updateDocument);
        res.json({status:200,message: "Document access updated"});
    }catch(err){
        next(err);
    }
};

const getDocument = async (req,res,next)=>{
    try{
        const tempDocument = await document.findById(req.params.id);
        res.json({status:200,tempDocument});
    }catch(err){
        next(err);
    }
};


const getAllPrescriptions = async (req,res,next)=>{
    try{
        const tempPrescriptions = await prescription.find({patient_email:req.body.patient_email});
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
        const tempBills = await bill.find({patient_email:req.body.patient_email});
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

module.exports = {
    updatePatient,deletePatient,getPatient,getAllVerifiedPatients,getAllRejectedPatients,getAllPendingforApproval_patients,getAllPatients, getAlldocuments, updateDocumentAccess, getDocument, getPrescription, getAllPrescriptions, getBill, getAllBills, buy_medicine, bill_claim_request, getAllPaymentreqs
};