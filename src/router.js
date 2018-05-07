const express = require('express');
const router = express.Router();
const securityRouter = require('./modules/user/routers/securityRouter');
router.use('/user', securityRouter);

module.exports = router;
