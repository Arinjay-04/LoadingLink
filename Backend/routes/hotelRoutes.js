const express = require('express');
const hotelController = require('../controllers/hotelController');
const { authMiddlewareHotel, authMiddlewareGuest } = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/create',  hotelController.createHotel);
router.get('/', authMiddlewareGuest,  hotelController.getHotels);

module.exports = router;
