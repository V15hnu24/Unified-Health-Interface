const organisation = require("../models/organisationSchema");
const rejected_organisation = require("../models/rejectedOrganisation");

const updateOrganisation= async (req,res,next)=>{
    try{
        const updateOrganisation = await organisation.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        //res.status(200).json(updateOrganisation);
        res.json({status:200,updateOrganisation});
    }catch(err){
        next(err);
    }
};

const deleteOrganisation = async(req,res,next) =>{
    try {
        await organisation.findByIdAndDelete(req.params.id);
        res.json({status:200,message:"User has been deleted"});
    } catch (error) {
        next(err);
    }
};

const getOrganisation = async (req,res,next)=>{
    try{
        const t = await organisation.findById(req.params.id);
        //res.status(200).json(t);
        res.json({status:200,t});
    }catch(err){
        next(err);
    }
};

const getAllVerifiedOrganisation = async (req,res,next)=>{
    try{
        const allP = await organisation.find({status:2});
        //res.status(200).json(allP);
        res.json({status:200,allP});
    }catch(err){
        next(err);
    }
};

const getAllRejectedOrganisation = async (req,res,next)=>{
    try{
        const allP = await rejected_organisation.find({status:3});
        //res.status(200).json(allP);
        res.json({status:200,allP});
    }catch(err){
        next(err);
    }
};

const getAllPendingforApproval_Organisation = async (req,res,next)=>{
    try{
        const allP = await organisation.find({status:1});
        //res.status(200).json(allP);
        res.json({status:200,allP});
    }catch(err){
        next(err);
    }
};

const getAllOrganisation = async (req,res,next)=>{
    try{
        const allP = await organisation.find();
        //res.status(200).json(allP);
        res.json({status:200,allP});
    }catch(err){
        next(err);
    }
};

// documents code

const getAlldocuments = async (req,res,next)=>{
    try{
        const t = await document.find({user_id:req.params.id});
        // res.status(200).json(allDocuemts);
        res.json({status:200,t});
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


const getPharmacy = async (req,res,next)=>{
    try{
        const t = await organisation.find({ organisationType: 'Pharmacy'});
        res.json({status:200,t});
    }catch(err){
        next(err);
    }
};
const getInsurance_firms = async (req,res,next)=>{
    try{
        const t = await organisation.find({ organisationType: 'Insurance_firms'});
        res.json({status:200,t});
    }catch(err){
        next(err);
    }
};
const getHospital = async (req,res,next)=>{
    try{
        const t = await organisation.find({ organisationType: 'Hospital'});
        res.json({status:200,t});
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
    updateOrganisation,deleteOrganisation,getOrganisation,getAllVerifiedOrganisation,getAllRejectedOrganisation,getAllPendingforApproval_Organisation,getAllOrganisation,getAlldocuments,getDocument,updateDocumentAccess, getPharmacy, getInsurance_firms, getHospital
};
