const express = require('express');
const router = express.Router();
router.use('/', require('./securityRouter'));

module.exports = router;
