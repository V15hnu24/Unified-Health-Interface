const patient = require("../models/patient");
const rejected_patients = require("../models/rejected_patients");

const updatePatient = async (req,res,next)=>{
//    console.log("IN put of User");
    try{
        const updatePatient = await patient.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updateUser);
    }catch(err){
        next(err);
    }
};

const deletePatient = async(req,res,next) =>{
    try {
        await patient.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(err);
    }
};

const getPatient = async (req,res,next)=>{
    try{
        const tempPatient = await patient.findById(req.params.id);
        res.status(200).json(tempPatient);
    }catch(err){
        next(err);
    }
};

const getAllVerifiedPatients = async (req,res,next)=>{
    try{
        const allPatients = await patient.find({status:2});
        res.status(200).json(allPatients);
    }catch(err){
        next(err);
    }
};

const getAllRejectedPatients = async (req,res,next)=>{
    try{
        const allPatients = await rejected_patients.find({status:3});
        res.status(200).json(allPatients);
    }catch(err){
        next(err);
    }
};

const getAllPendingforApproval_patients = async (req,res,next)=>{
    try{
        const allPatients = await patient.find({status:1});
        res.status(200).json(allPatients);
    }catch(err){
        next(err);
    }
};

const getAllPatients = async (req,res,next)=>{
    try{
        const allPatients = await patient.find();
        res.status(200).json(allPatients);
    }catch(err){
        next(err);
    }
};

const getAlldocuments = async (req,res,next)=>{
    try{
        const allDocuemts = await document.find({user_id:req.params.id});
        res.status(200).json(allDocuemts);
    }catch(err){
        next(err);
    }
};

const updateDocumentAccess = async (req,res,next)=>{
    try{
        const updateDocument = await document.findById(req.body.document_id);
        const ary = updateDocument.access_to;
        ary.push({user_type:req.body.user_type, user_id:req.body.user_id});
        const set_updateDocument = await document.findByIdAndUpdate(req.params.id,{$set:{access_to:ary}},{new:true});
        res.status(200).json(set_updateDocument);
    }catch(err){
        next(err);
    }
} ;

const getDocument = async (req,res,next)=>{
    try{
        const tempDocument = await document.findById(req.body.document_id);
        res.status(200).json(tempDocument);
    }catch(err){
        next(err);
    }
};

module.exports = {
    updatePatient,deletePatient,getPatient,getAllVerifiedPatients,getAllRejectedPatients,getAllPendingforApproval_patients,getAllPatients, getAlldocuments, updateDocumentAccess, getDocument
};