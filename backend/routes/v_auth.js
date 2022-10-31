const express = require('express');
const {professional_register, professional_login,organisation_resgister,organisation_login} = require('../controllers/auth');
const router = express.Router();
// new
router.post("/organisation_register",organisation_resgister); 
router.post("/organisation_login", organisation_login);
router.post("/professional_register",professional_register); 
router.post("/professional_login", professional_login);
module.exports = router;