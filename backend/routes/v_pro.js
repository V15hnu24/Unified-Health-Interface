const express = require('express');
// const { create_bill, create_prescription } = require('../controllers/doctor_billsAnd_prescriptions');
const { updateProfessional,deleteProfessional,getProfessional,getAllVerifiedProfessionals,getAllRejectedProfessionals,getAllPendingforApproval_Professionals,getAllProfessionals,updateDocumentAccess, getAlldocuments, getDocument, getDocumentPatients} = require('../controllers/professional');

const {create_bill, create_prescription, getAllPrescriptions, getPrescription, getAllBills, getBill} = require('../controllers/doctor_billsAnd_prescriptions');

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
router.get("/verified_professionals/:id", verifyAdmin, getAllProfessionals);

//GetAll pending for verfication patients
router.get("/verifyPending_professionals", verifyAdmin, getAllPendingforApproval_Professionals);

router.get("/professional_documents/:id", verifyUser, getAlldocuments);
router.post("/documents/:id", verifyUser, updateDocumentAccess);
router.get("/professional_document/:id", verifyDocumentAccess, getDocument);
router.get("/professional_get_doc/:id", verifyUser, getDocumentPatients);

router.post("/create_prescription", verifyUser, create_prescription);

router.post("/create_bill", verifyUser, create_bill);

router.get("/get_prescriptions", verifyUser, getAllPrescriptions);

router.get("/get_prescription", verifyUser, getPrescription);

router.get("/get_Bills", verifyUser, getAllBills);

router.get("/get_Bill", verifyUser, getBill);


module.exports = router;
