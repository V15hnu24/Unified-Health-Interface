const express = require('express');
const router =  express.Router();

const {sign, verify} = require('../controllers/digital_signatures');

router.post('/d_sign', sign);

router.post('/d_verify', verify);

module.exports = router;