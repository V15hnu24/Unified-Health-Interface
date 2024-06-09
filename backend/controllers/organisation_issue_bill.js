const organisationSchema = require("../models/organisationSchema");
const { sign_function } = require("./digital_signatures");


const create_bill = async (req, res, next) => {
    try {
        const data = {patient_email: req.body.patient_email, issued_user_type:"organisation", issued_user_id: req.body.organisation_id, document_link: req.body.document_link, bill_amount: req.body.bill_amount};

        const organisation = await organisationSchema.findById(req.body.professional_id);

        const temp_user = await user.find({email:organisation.email});
        data.bill_name = "bill issued to patient " + req.body.patient_email + " by organisation " + organisation.email;

        const signature = sign_function(JSON.stringify(data), temp_user.private_key);

        data.signature = signature;

        const newBill = new bill(data);
        await newBill.save();

        res.json({status:200,message:"Bill added"});
    } catch (error) {
        next(error);
    }
};

module.exports = { create_bill};