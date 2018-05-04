const express = require('express');
const paramHandler = require('../../lib/middleware/paramHandler');
const Authority = require('../../lib/middleware/authority');
const UserController = require('../../controllers/userController');

const router = express.Router();

/**
 * 用户登录
 */
router.post('/login', paramHandler, UserController.login);

/**
 * 修改密码
 */
router.post('/password/update', paramHandler, Authority.isAdmin, UserController.updatePassword);

/**
 * 用户退出
 */
router.post('/logout', paramHandler, Authority.isAdmin, UserController.logout);


module.exports = router;