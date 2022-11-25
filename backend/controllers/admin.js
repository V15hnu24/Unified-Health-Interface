const blocked_organisations = require('../models/blocked_organisations');
const blocked_patients = require('../models/blocked_patients');
const blocked_professionals = require('../models/blocked_professionals');
const organisationSchema = require('../models/organisationSchema');
const paitent = require('../models/patient');
const professionalSchema = require('../models/professionalSchema');
const rejectedProfessional = require('../models/rejectedProfessional');
const rejected_patients = require('../models/rejected_patients');

const patient_update = async (req,res,next) =>{
    try{
        const verified_patients = req.body.verified_patients;
        const rejected_patients = req.body.rejected_patients;
        const block_patientsList = req.body.block_patientsList;

        for(i=0;i<verified_patients.length;i++){
            await patient.findByIdAndUpdate(verified_patients[i],{$set:{status:2}},{new:true});
        }

        for(i=0;i<rejected_patients.length;i++){
            await patient.findByIdAndUpdate(rejected_patients[i].id,{$set:{status:3}},{new:true});
            const new_rejected_patient = new rejected_patients({
                id:rejected_patients[i].id,
                reason:rejected_patients[i].reason,
                admin_id: req.body.admin_id
            });
            await new_rejected_patient.save();
        }

        for(i=0;i<block_patientsList.length;i++){
            await patient.findByIdAndUpdate(block_patientsList[i].id,{$set:{status:4}},{new:true});
            const new_blocked_patient = new blocked_patients({
                id:block_patientsList[i].id,
                reason:block_patientsList[i].reason,
                admin_id: req.body.admin_id
            });
            await new_blocked_patient.save();
        }

        res.json({status:200, message:"Patients status updated"});
    }catch(err){
        next(err);
    }
};

const professional_status_update = async (req,res,next) =>{
    try{
        const verified_professionals = req.body.verified_professionals;
        const rejected_professionals = req.body.rejected_professionals;
        const block_professionals = req.body.block_professionals;

        for(i=0;i<verified_professionals.length;i++){
            await professionalSchema.findByIdAndUpdate(verified_professionals[i],{$set:{status:2}},{new:true});
        }

        for(i=0;i<rejected_professionals.length;i++){
            await patient.findByIdAndUpdate(rejected_professionals[i].id,{$set:{status:3}},{new:true});
            const new_rejected_professionals = new rejectedProfessional({
                id:rejected_professionals[i].id,
                reason:rejected_professionals[i].reason,
                admin_id: req.body.admin_id
            });
            await new_rejected_professionals.save();
        }

        for(i=0;i<block_professionals.length;i++){
            await patient.findByIdAndUpdate(block_professionals[i].id,{$set:{status:4}},{new:true});
            const new_blocked_professionals = new blocked_professionals({
                id:block_professionals[i].id,
                reason:block_professionals[i].reason,
                admin_id: req.body.admin_id
            });
            await new_blocked_professionals.save();
        }

        res.json({status:200, message:"_professionals status updated"});
    }catch(err){
        next(err);
    }
};

const organisation_status_update = async (req,res,next) =>{
    try{
        const verified_organisations = req.body.verified_organisations;
        const rejected_organisations = req.body.rejected_organisations;
        const block_organisations = req.body.block_organisations;

        for(i=0;i<verified_organisations.length;i++){
            await organisationSchema.findByIdAndUpdate(verified_organisations[i],{$set:{status:2}},{new:true});
        }

        for(i=0;i<rejected_organisations.length;i++){
            await patient.findByIdAndUpdate(rejected_organisations[i].id,{$set:{status:3}},{new:true});
            const new_rejected_organisations = new rejected_organisations({
                id:rejected_organisations[i].id,
                reason:rejected_organisations[i].reason,
                admin_id: req.body.admin_id
            });
            await new_rejected_organisations.save();
        }

        for(i=0;i<block_organisations.length;i++){
            await patient.findByIdAndUpdate(block_organisations[i].id,{$set:{status:4}},{new:true});
            const new_blocked_organisations = new blocked_organisations({
                id:block_organisations[i].id,
                reason:block_organisations[i].reason,
                admin_id: req.body.admin_id
            });
            await new_blocked_organisations.save();
        }

        res.json({status:200, message:"_professionals status updated"});
    }catch(err){
        next(err);
    }
};



module.exports = {
    patient_update, professional_status_update, organisation_status_update
};