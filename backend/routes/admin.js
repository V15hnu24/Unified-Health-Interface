const express =  require('express');
const { patient_update } = require('../controllers/admin');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

//update patient status
router.post('/patient_update', verifyAdmin, patient_update);

// Delete a patient


module.exports = router;