const express = require('express');
const {updateOrganisation,deleteOrganisation,getOrganisation,getAllVerifiedOrganisation,getAllRejectedOrganisation,getAllPendingforApproval_Organisation,getAllOrganisation,getAlldocuments,getDocument,updateDocumentAccess} = require('../controllers/organisation');
const router =  express.Router();
const {verifyToken, verifyUser, verifyAdmin, verifyDocumentAccess}  = require('../utils/verifyToken');
router.put("/:id",verifyUser, updateOrganisation);
router.delete("/:id",verifyUser, deleteOrganisation);
router.get("/:id",verifyUser, getOrganisation);
router.get("/rejected_organisation", verifyUser, getAllRejectedOrganisation);
router.get("/verified_organisation", verifyUser, getAllOrganisation);
router.get("/verifyPending_organisation", verifyUser, getAllPendingforApproval_Organisation);
router.get("/organisation_documents/:id", verifyUser, getAlldocuments);
router.post("/documents/:id", verifyUser, updateDocumentAccess);
router.get("/organisation_document/:id", verifyDocumentAccess, getDocument);

router.get("/getPharmacy",verifyUser, getPharmacy);
router.get("/getHospital",verifyUser, getHospital);
router.get("/getInsurance_firms",verifyUser, getInsurance_firms);

//Get all buy requests for pharmacy
module.exports = router;