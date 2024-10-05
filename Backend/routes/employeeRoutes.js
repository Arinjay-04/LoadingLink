const express = require('express');
const employeeController = require('../controllers/employeeController');
const { authMiddlewareHotel, authMiddlewareGuest } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', authMiddlewareHotel, employeeController.addEmployee);

module.exports = router;
