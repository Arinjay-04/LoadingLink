const express = require('express');
const GuestController = require('../controllers/guestController');
const { authMiddlewareHotel, authMiddlewareGuest } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/create', GuestController.createGuest);

module.exports = router;