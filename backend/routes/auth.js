const express = require('express');
const { patient_login, patient_register, admin_login,admin_register, logout } = require('../controllers/auth');
const { email_otp, verify_otp } = require('../controllers/otp');
const upload = require('../middleware/upload');
const router = express.Router();

const {professional_register, professional_login,organisation_resgister,organisation_login} = require('../controllers/v_auth');
// const router = express.Router();
// new
router.post("/organisation_register",organisation_resgister); 
router.post("/organisation_login", organisation_login);
router.post("/professional_register",professional_register); 
router.post("/professional_login", professional_login);

router.post('/patient_register', patient_register);
router.post("/patient_login", patient_login);
router.post("/admin_register", admin_register);
router.post("/admin_login", admin_login);
router.post("/send_otp", email_otp);
router.post("/verify_otp", verify_otp);
router.post("/logout", logout);

module.exports = router;