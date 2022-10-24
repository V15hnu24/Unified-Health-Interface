const express = require('express');
const { getAllRejectedPatients, getAllVerifiedPatients, updatePatient, deletePatient, getPatient } = require('../controllers/patient');
const router =  express.Router();
const {verifyToken, verifyUser, verifyAdmin}  = require('../utils/verifyToken');

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

module.export = router;