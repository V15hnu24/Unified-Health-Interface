const health_report = require('../models/health_report');
const organisation = require('../models/organisationSchema');
const user = require('../models/user');
const { sign_function } = require('./digital_signatures');


const issue_report = async (req, res, next) => {
    try {

        const data = {
            report_name: req.body.report_name,
            patient_email: req.body.patient_email,
            organisation_id: req.body.organisation_id,
            report_link: req.body.report_link
        };

        const organisation = await organisation.findById(req.body.organisation_id);
        const user = await user.find({email:organisation.email});
        const signature = sign_function(JSON.stringify(data), user.private_key);

        data.signature = signature;

        const newReport = new health_report(data);
        await newReport.save();

        res.json({status:200,message:"Report added"});

    } catch (error) {
        next(error);
    }
};

module.exports = { issue_report };