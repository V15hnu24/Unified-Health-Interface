const professional = require("../models/professionalSchema");
const rejected_professional = require("../models/rejectedProfessional");
const user = require("../models/user");
const document = require("../models/document");
const patient = require("../models/patient");

const updateProfessional= async (req,res,next)=>{
    try{
        const updateProfessional = await professional.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        //res.status(200).json(updateProfessional);
        res.json({status:200,updateProfessional});
    }catch(err){
        next(err);
    }
};



const deleteProfessional = async(req,res,next) =>{
    try {
        await professional.findByIdAndDelete(req.params.id);
        res.json({status:200,message:"User has been deleted"});
    } catch (error) {
        next(err);
    }
};

const getProfessional = async (req,res,next)=>{
    try{
        const tempProfessional = await professional.findById(req.params.id);
        res.json({status:200,tempProfessional});
    }catch(err){
        next(err);
    }
};

const getAllVerifiedProfessionals = async (req,res,next)=>{
    try{
        const allP = await professional.find({status:2});
        res.json({status:200,allP});
    }catch(err){
        next(err);
    }
};

const getAllRejectedProfessionals = async (req,res,next)=>{
    try{
        const allP = await rejected_professional.find({status:3});
        res.json({status:200,allP});
    }catch(err){
        next(err);
    }
};

const getAllPendingforApproval_Professionals = async (req,res,next)=>{
    try{
        const allP = await professional.find({status:1});
        //res.status(200).json(allP);
        res.json({status:200,allP});
    }catch(err){
        next(err);
    }
};

const getAllProfessionals = async (req,res,next)=>{
    try{
        const allP = await professional.find();
        //res.status(200).json(allP);
        res.json({status:200,allP});
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
        const updateDocument = await document.findById(req.body.document_id);
        const ary = updateDocument.access_to;
        ary.push({user_type:req.body.user_type, user_email:req.body.user_email});
        const set_updateDocument = await document.findByIdAndUpdate(req.params.id,{$set:{access_to:ary}},{new:true});
        // res.status(200).json(set_updateDocument);
        res.json({status:200,set_updateDocument});
    }catch(err){
        next(err);
    }
} ;

const getDocument = async (req,res,next)=>{
    try{
        const tempDocument = await document.findById(req.params.id);
        res.json({status:200,tempDocument});
    }catch(err){
        next(err);
    }
};

const getDocumentPatients = async (req,res,next)=>{
    try{
        const tempDocument = await document.find({user:"patient"});
        res.json({status:200,tempDocument});
    }catch(err){
        next(err);
    }
}
module.exports = {
    updateProfessional,deleteProfessional,getProfessional,getAllVerifiedProfessionals,getAllRejectedProfessionals,getAllPendingforApproval_Professionals,getAllProfessionals,getAlldocuments,getDocument,updateDocumentAccess,getDocumentPatients
};
