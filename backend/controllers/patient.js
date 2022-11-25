const patient = require("../models/patient");
const rejected_patients = require("../models/rejected_patients");
const { sign_function } = require("./digital_signatures");
// const {}

const updatePatient = async (req,res,next)=>{
   console.log("In put of User");
    try{
        const updatePatient = await patient.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.json({status:200,updateUser});
    }catch(err){
        next(err);
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
        const allDocuemts = await document.find({user_id:req.params.id});
        // res.status(200).json(allDocuemts);
        res.json({status:200,allDocuemts});
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

module.exports = {
    updatePatient,deletePatient,getPatient,getAllVerifiedPatients,getAllRejectedPatients,getAllPendingforApproval_patients,getAllPatients, getAlldocuments, updateDocumentAccess, getDocument
};