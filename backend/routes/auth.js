const express = require('express');
const { patient_login, patient_register, admin_login,admin_register } = require('../controllers/auth');
const { email_otp, verify_otp } = require('../controllers/otp');
const upload = require('../middleware/upload');
const router = express.Router();

router.post("/patient_register",upload.array('register_documents[]'),patient_register); // patient_register is a function in auth.js
router.post("/patient_login", patient_login);
router.post("/admin_register", admin_register);
router.post("/admin_login", admin_login);
router.post("/send_otp", email_otp);
router.post("/verify_otp", verify_otp);

module.exports = router;