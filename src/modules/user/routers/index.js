const express = require('express');
const router = express.Router();
router.post('/', function() {
  console.log('ddd');
});

module.exports = router;
