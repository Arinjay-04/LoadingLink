const db = require('../config/db');

exports.createReservation = async (req, res) => {
    try {
        const hotelid  = req.body.hotelId;
        const userId = req.userId;
        const  roomId  = req.body.roomnumber;

        console.log(roomId);
        console.log(hotelid);
        // Validate inputs
        if (!hotelid || !userId || !roomId) {
            return res.status(400).send("Missing required fields");
        }

        // Check if room exists and get the price
        const amountResult = await db.query("SELECT price FROM room WHERE roomnumber = $1 AND hotelid = $2", [roomId, hotelid]);

        // Handle the case where no rows are returned
        if (amountResult.rows.length === 0) {
            return res.status(404).send("Room not found");
        }

        // Extract the price
        const price = amountResult.rows[0].price;

        console.log(`Price for room ${roomId}: $${price}`);

        // Insert reservation
        const result = await db.query("INSERT INTO reservation (checkindate, status, guestid, hotelid, roomid , paymentdate, paymentmethod, amount) VALUES (NOW(), 'confirmed', $1, $2, $3, NOW(), 'Card', $4)", [ userId, hotelid,roomId, price]);

        if (result.rowCount === 0) {
            return res.status(400).send("Sorry, cannot insert");
        }

        res.status(200).send("Reservation created successfully!");
    } catch (error) {
        console.error("Error inserting reservation:", error);
        res.status(500).send("Internal Server Error");
    }
};


// Add more reservation-related functions as needed
