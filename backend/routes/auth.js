const express = require('express');
const { patient_login, patient_register, admin_login,admin_register } = require('../controllers/auth');
const router = express.Router();

router.post("/patient_register", patient_register);
router.post("/patient_login", patient_login);
router.post("/admin_register", admin_register);
router.post("/admin_login", admin_login);
module.exports = router;