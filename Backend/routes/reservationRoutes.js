const express = require('express');
const reservationController = require('../controllers/reservationController');
const { authMiddlewareHotel, authMiddlewareGuest } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddlewareGuest, reservationController.createReservation);

module.exports = router;
