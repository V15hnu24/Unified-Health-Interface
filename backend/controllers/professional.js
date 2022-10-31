const professional = require("../models/professionalSchema");
const rejected_professional = require("../models/rejectedProfessional");


const updateProfessional= async (req,res,next)=>{
    try{
        const updateProfessional = await professional.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updateProfessional);
    }catch(err){
        next(err);
    }
};

const deleteProfessional = async(req,res,next) =>{
    try {
        await professional.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(err);
    }
};

const getProfessional = async (req,res,next)=>{
    try{
        const tempProfessional = await professional.findById(req.params.id);
        res.status(200).json(tempProfessional);
    }catch(err){
        next(err);
    }
};

const getAllVerifiedProfessionals = async (req,res,next)=>{
    try{
        const allP = await professional.find({status:2});
        res.status(200).json(allP);
    }catch(err){
        next(err);
    }
};

const getAllRejectedProfessionals = async (req,res,next)=>{
    try{
        const allP = await rejected_professional.find({status:3});
        res.status(200).json(allP);
    }catch(err){
        next(err);
    }
};

const getAllPendingforApproval_Professionals = async (req,res,next)=>{
    try{
        const allP = await professional.find({status:1});
        res.status(200).json(allP);
    }catch(err){
        next(err);
    }
};

const getAllProfessionals = async (req,res,next)=>{
    try{
        const allP = await professional.find();
        res.status(200).json(allP);
    }catch(err){
        next(err);
    }
};

module.exports = {
    updateProfessional,deleteProfessional,getProfessional,getAllVerifiedProfessionals,getAllRejectedProfessionals,getAllPendingforApproval_Professionals,getAllProfessionals
};