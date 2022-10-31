const express = require('express');
const { patient_login, patient_register, admin_login,admin_register, logout } = require('../controllers/auth');
const { email_otp, verify_otp } = require('../controllers/otp');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/patient_register', patient_register);
router.post("/patient_login", patient_login);
router.post("/admin_register", admin_register);
router.post("/admin_login", admin_login);
router.post("/send_otp", email_otp);
router.post("/verify_otp", verify_otp);
router.post("/logout", logout);

module.exports = router;