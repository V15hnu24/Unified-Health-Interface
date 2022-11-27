const express =  require('express');
const { patient_update, professional_status_update, organisation_status_update,
    getAllPatients, getAllProfessionals, getAllOrganisations, getAllHealthReports,
    getAllBills, getAllMedBuyRequests, getAllInsuranceClaims,getAllPrescriptions } = require('../controllers/admin');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

//update patient status
router.post('/patient_update', verifyAdmin, patient_update);

router.post('/professional_update', verifyAdmin, professional_status_update);

router.post('/organisation_update', verifyAdmin, organisation_status_update);

// router.get("/get_prescriptions", verifyAdmin, getAllPrescriptions);

// router.get("/get_prescription", verifyAdmin, getPrescription);

router.get("/get_All_bills", verifyAdmin, getAllBills);

// router.get("/get_Bill", verifyAdmin, getBill);

router.get("/get_All_organisations", verifyAdmin, getAllOrganisations);

router.get("/get_All_professionals", verifyAdmin, getAllProfessionals);

router.get("/get_All_patients", verifyAdmin, getAllPatients);

router.get("/get_All_prescriptions", verifyAdmin, getAllPrescriptions);

router.get("/get_All_Bills", verifyAdmin, getAllBills);

router.get("/get_All_insurance_claims", verifyAdmin, getAllInsuranceClaims);

router.get("/get_all_med_buy_requests", verifyAdmin, getAllMedBuyRequests);

router.get("/get_all_health_reports", verifyAdmin, getAllHealthReports);




module.exports = router;