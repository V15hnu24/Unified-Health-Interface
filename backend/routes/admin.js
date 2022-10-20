const express =  require('express');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.post('/patient_update', verifyAdmin, )

module.exports = router;