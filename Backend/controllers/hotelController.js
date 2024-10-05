const db = require('../config/db');
const bycrpt = require('bcryptjs')

exports.createHotel = async (req, res) => {
    try {
        const { name, address, phone, email, password } = req.body;
        const hashpassword = await bycrpt.hash(password, 10);
        
        const result = await db.query("INSERT INTO hotel (name, address, phone, email, password) VALUES ($1, $2, $3, $4, $5)", [name, address, phone, email, hashpassword]);

        if (result.rowCount === 0) {
            return res.status(400).send("Failed to insert data");
        }

        res.status(200).send('Success...!!!');
    } catch (err) {
        console.error("Error in sending data:", err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getHotels = async (req, res) => {
    try {
        const result = await db.query("SELECT hotel.*, COUNT(room.roomnumber) as Available_Room FROM hotel LEFT JOIN room ON hotel.hotelid = room.hotelid AND room.status = 'Available' GROUP BY hotel.hotelid ORDER BY hotel.hotelid");
        res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).send("Internal Server error", error);
    }
};


