const paitent = require('../models/patient');
const rejected_patients = require('../models/rejected_patients');

const patient_update = async (req,res,next) =>{
    try{

        const verified_patients = req.body.verified_patients;
        const rejected_patients = req.body.rejected_patients;

        for(i=0;i<verified_patients.length;i++){
            await patient.findByIdAndUpdate(verified_patients[i],{$set:{status:2}},{new:true});
        }

        for(i=0;i<rejected_patients.length;i++){
            await patient.findByIdAndUpdate(rejected_patients[i].id,{$set:{status:3}},{new:true});
            const new_rejected_patient = new rejected_patients({
                id:rejected_patients[i].id,
                reason:rejected_patients[i].reason
            });
            await new_rejected_patient.save();
        }

        res.status(200).json("Patients status updated");
    }catch(err){
        next(err);
    }
};

const block_patients = async (req,res,next) =>{
    try{
        
    }catch(err){
        next(err);
    }
};

module.exports = {
    patient_update
};