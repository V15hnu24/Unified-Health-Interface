const express = require('express');
const {updateProfessional,deleteProfessional,getProfessional,getAllVerifiedProfessionals,getAllRejectedProfessionals,getAllPendingforApproval_Professionals,getAllProfessionals} = require('../controllers/organisation');
const router =  express.Router();
const {verifyToken, verifyUser, verifyAdmin}  = require('../utils/verifyToken');
router.put("/:id",verifyUser, updateProfessional);
router.delete("/:id",verifyUser, deleteProfessional);
router.get("/:id",verifyUser, getProfessional);
router.get("/rejected_professionals", verifyAdmin, getAllRejectedProfessionals);
router.get("/verified_professionals", verifyAdmin, getAllProfessionals);
router.get("/verifyPending_professionals", verifyAdmin, getAllPendingforApproval_Professionals);

module.export = router;