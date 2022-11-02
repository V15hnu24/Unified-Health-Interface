const express = require('express');
const { updateProfessional,deleteProfessional,getProfessional,getAllVerifiedProfessionals,getAllRejectedProfessionals,getAllPendingforApproval_Professionals,getAllProfessionals,updateDocumentAccess, getAlldocuments, getDocument} = require('../controllers/professional');
const router =  express.Router();
const {verifyToken, verifyUser, verifyAdmin, verifyDocumentAccess}  = require('../utils/verifyToken');
router.put("/:id",verifyUser, updateProfessional);

//Delete
router.delete("/:id",verifyUser, deleteProfessional);

//Get
router.get("/:id",verifyUser, getProfessional);

//GetAll rejected patients
router.get("/rejected_professionals", verifyAdmin, getAllRejectedProfessionals);

//GetAll Verified patients
router.get("/verified_professionals", verifyAdmin, getAllVerifiedProfessionals);

//GetAll pending for verfication patients
router.get("/verifyPending_professionals", verifyAdmin, getAllPendingforApproval_Professionals);

router.get("/professional_documents/:id", verifyUser, getAlldocuments);
router.post("/documents/:id", verifyUser, updateDocumentAccess);
router.get("/professional_document/:id", verifyDocumentAccess, getDocument);
module.export = router;