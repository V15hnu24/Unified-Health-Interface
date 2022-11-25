const express = require('express');
const {updateOrganisation,deleteOrganisation,getOrganisation,getAllVerifiedOrganisation,getAllRejectedOrganisation,getAllPendingforApproval_Organisation,getAllOrganisation,getAlldocuments,getDocument,updateDocumentAccess} = require('../controllers/organisation');
const router =  express.Router();
const {verifyToken, verifyUser, verifyAdmin, verifyDocumentAccess}  = require('../utils/verifyToken');
router.put("/:id",verifyUser, updateOrganisation);
router.delete("/:id",verifyUser, deleteOrganisation);
router.get("/:id",verifyUser, getOrganisation);
router.get("/rejected_organisation", verifyAdmin, getAllRejectedOrganisation);
router.get("/verified_organisation", verifyAdmin, getAllOrganisation);
router.get("/verifyPending_organisation", verifyAdmin, getAllPendingforApproval_Organisation);
router.get("/organisation_documents/:id", verifyUser, getAlldocuments);
router.post("/documents/:id", verifyUser, updateDocumentAccess);
router.get("/organisation_document/:id", verifyDocumentAccess, getDocument);

//Get all buy requests for pharmacy

module.exports = router;
