const express = require('express');
const securityController = require('../controllers/securityController');

const router = express.Router();

/**
 * 用户登录
 */
router.get('/login', securityController.login);


module.exports = router;
