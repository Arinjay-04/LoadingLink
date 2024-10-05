const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login/hotel', authController.loginHotel);
router.post('/login/customer', authController.loginCustomer);

module.exports = router;
