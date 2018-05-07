const express = require('express');
const router = express.Router();
const userRouter = require('./modules/user/routers/index');
router.use('/user', userRouter);

module.exports = router;
