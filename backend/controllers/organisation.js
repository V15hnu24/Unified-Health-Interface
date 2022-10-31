const organisation = require("../models/organisationSchema");
const rejected_organisation = require("../models/rejectedOrganisation");


const updateOrganisation= async (req,res,next)=>{
    try{
        const updateOrganisation = await organisation.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updateOrganisation);
    }catch(err){
        next(err);
    }
};

const deleteOrganisation = async(req,res,next) =>{
    try {
        await organisation.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(err);
    }
};

const getOrganisation = async (req,res,next)=>{
    try{
        const t = await organisation.findById(req.params.id);
        res.status(200).json(t);
    }catch(err){
        next(err);
    }
};

const getAllVerifiedOrganisation = async (req,res,next)=>{
    try{
        const allP = await organisation.find({status:2});
        res.status(200).json(allP);
    }catch(err){
        next(err);
    }
};

const getAllRejectedOrganisation = async (req,res,next)=>{
    try{
        const allP = await rejected_organisation.find({status:3});
        res.status(200).json(allP);
    }catch(err){
        next(err);
    }
};

const getAllPendingforApproval_Organisation = async (req,res,next)=>{
    try{
        const allP = await organisation.find({status:1});
        res.status(200).json(allP);
    }catch(err){
        next(err);
    }
};

const getAllOrganisation = async (req,res,next)=>{
    try{
        const allP = await organisation.find();
        res.status(200).json(allP);
    }catch(err){
        next(err);
    }
};

module.exports = {
    updateOrganisation,deleteOrganisation,getOrganisation,getAllVerifiedOrganisation,getAllRejectedOrganisation,getAllPendingforApproval_Organisation,getAllOrganisation
};

