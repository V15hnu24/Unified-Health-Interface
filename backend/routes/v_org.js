const express = require('express');
const {updateOrganisation,deleteOrganisation,getOrganisation, getAllVerifiedOrganisation,getAllRejectedOrganisation,getAllPendingforApproval_Organisation,getAllOrganisation,getAlldocuments,getDocument,updateDocumentAccess} = require('../controllers/organisation');

const {getPharmacy, getInsurance_firms, getHospital} = require('../controllers/organisation');


const router =  express.Router();
const { getAllbuyRequests, getbuyRequest, verify_prescription, payment_request } = require('../controllers/sell_medicines');
const {verifyToken, verifyUser, verifyAdmin, verifyDocumentAccess}  = require('../utils/verifyToken');
const {create_bill} = require('../controllers/organisation_issue_bill');
const {getAllClaims, verifyBill} = require('../controllers/bill_claim');
const { issue_report } = require('../controllers/hostpital_issue_reports');
const { create_prescription, getPrescription } = require('../controllers/doctor_billsAnd_prescriptions');

router.put("/:id",verifyUser, updateOrganisation);
router.delete("/:id",verifyUser, deleteOrganisation);
router.get("/:id",verifyUser, getOrganisation);
router.get("/rejected_organisation", verifyUser, getAllRejectedOrganisation);
router.get("/verified_organisation/:id", verifyUser, getAllOrganisation);
router.get("/verifyPending_organisation", verifyUser, getAllPendingforApproval_Organisation);
router.get("/organisation_documents/:id", verifyUser, getAlldocuments);
router.post("/documents/:id", verifyUser, updateDocumentAccess);
router.get("/organisation_document/:id", verifyDocumentAccess, getDocument);

router.get("/getPharmacy",verifyUser, getPharmacy);
router.get("/getHospital",verifyUser, getHospital);
router.get("/getInsurance_firms",verifyUser, getInsurance_firms);

//Get all buy requests for pharmacy

router.post("/create_prescription", verifyUser, create_prescription);

router.get("/getBuyRequests", verifyUser, getAllbuyRequests);
router.get("/getbuyRequest", verifyUser, getbuyRequest);
router.post("/verify_prescription", verifyUser, verify_prescription);

router.post("/get_prescription", verifyUser, getPrescription);
router.post("/payment_request", verifyUser, payment_request);

router.post("/issue_bill", verifyUser, create_bill);

router.get("/pharmacy/getAllClaims", verifyUser, getAllClaims);

router.post("/issue_report", verifyUser, issue_report);

module.exports = router;