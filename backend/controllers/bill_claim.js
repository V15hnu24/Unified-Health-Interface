const bill = require('../models/bill');
const Insurance_claim = require('../models/Insurance_claim');
const organisationSchema = require('../models/organisationSchema');
const { verify_function } = require('./digital_signatures');

const verifyBill = async (req,res,next)=>{
    try {
        const bill = await bill.findById(req.body.bill_id);
        const patient = await patient.findById(req.body.patient_id);
        // const organisation = await organisationSchema.find({email:req.body.issued_by_email});

        const data = {patient_email: patient.email, issued_user_type:req.body.issued_user_type, issued_user_id: req.body.issued_user_id, document_link: req.body.document_link, bill_amount: req.body.bill_amount, bill_name: req.body.bill_name};

        const signature= req.body.signature;
        
        const verify = false;
        if(req.body.issued_user_type == "professional"){
            const professional = await professional.findById(req.body.professional_id);
            const user = await user.find({email:professional.email});
            verify = verify_function(JSON.stringify(data), signature, user.publicKey);
        }else if(req.body.issued_user_type == "organization"){
            const organisation = await organisationSchema.findById(req.body.organisation_id);
            const user = await user.find({email:organisation.email});
            verify = verify_function(JSON.stringify(data), signature, user.publicKey);    
        }

        if(verify){
            res.json({status:200,verified:true, message:"Bill verified"});
        }else{
            res.json({status:200,verified:false, message:"Bill not verified"});
        }
    } catch (error) {
        next(error);
    }
};

const getAllClaims = async (req,res,next)=>{
    try {
        
        const claims = await Insurance_claim({organisation_id:req.body.organisation_id});
        res.json({status:200,claims:claims, message:"Claims fetched"});

    } catch (error) {
        next(error);
    }
};

module.exports = {verifyBill, getAllClaims};