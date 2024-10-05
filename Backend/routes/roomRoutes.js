const express = require('express');
const roomController = require('../controllers/roomController');
const { authMiddlewareHotel, authMiddlewareGuest } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddlewareHotel ,  roomController.getHotelRooms );
router.get('/guest/:hotelId',  roomController.getGuestRooms);
router.post('/insert', authMiddlewareHotel,  roomController.insertRoom);
router.post('/delete', authMiddlewareHotel,  roomController.deleteRoom);
router.put('/update', authMiddlewareHotel,  roomController.updateRoom);


module.exports = router;



