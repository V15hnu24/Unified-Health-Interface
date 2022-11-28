const express = require('express');
const { getAllRejectedPatients, getAllVerifiedPatients, updatePatient, deletePatient, getPatient, updateDocumentAccess, getAlldocuments, getDocument, getAllPrescriptions, getPrescription, getBill, getAllBills, buy_medicine, bill_claim_request } = require('../controllers/patient');
const router =  express.Router();
const {verifyToken, verifyUser, verifyAdmin, verifyDocumentAccess}  = require('../utils/verifyToken');

//Update
router.put("/:id",verifyUser, updatePatient);

//Delete
router.delete("/:id",verifyUser, deletePatient);

//Get
router.get("/:id",verifyUser, getPatient);

//GetAll rejected patients
router.get("/rejected_patients", verifyAdmin, getAllRejectedPatients);

//GetAll Verified patients
router.get("/verified_patients", verifyAdmin, getAllVerifiedPatients);

//GetAll pending for verfication patients
router.get("/verifyPending_patients", verifyAdmin, getAllVerifiedPatients);

//get all documents of a patient req.params.id == patient_id
// You will be able to get all documents of a patient 
router.get("/patient_documents/:id", verifyUser, getAlldocuments);

//Update the document access send the document_id in req.body.document_id
// and the user_type and user_email in req.body.user_type and req.body.user_email
router.post("/updateDocumentAccess", verifyUser, updateDocumentAccess);

//To get particular document send document_id in req.params.id
// and the user_type and user_email in req.body.user_type and req.body.user_email as we have kept email as unique identifier for every user for now
router.get("/patient_document/:id", verifyDocumentAccess, getDocument);

router.get("/get_prescriptions/:id", verifyUser, getAllPrescriptions);

router.get("/get_prescription", verifyUser, getPrescription);

router.get("/get_Bills", verifyUser, getAllBills);

router.get("/get_Bill", verifyUser, getBill);

router.post("/send_buy_request/:id", verifyUser, buy_medicine );

router.post("/send_bill_claim_request", verifyUser, bill_claim_request);



module.exports = router;