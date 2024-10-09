const db = require('../config/db');

exports.insertRoom = async (req, res) => {
    try {
        const { roomnumber, type, price } = req.body;
        const hotelId = req.hotelId.hotelId;
        console.log(roomnumber + " " + type + " "+ price + " " + hotelId);
        const status = 'Available';
        if(!hotelId){
            return res.status(404).send("Token not found...");
        }
        const result = await db.query("INSERT INTO room (roomnumber, type, status, price, hotelid) VALUES ($1, $2, $3, $4, $5)", [roomnumber, type, status, price, hotelId]);

        if (result.rowCount === 0) {
            return res.status(400).send("Failed to insert data");
        }

        res.status(200).send('Success...!!!');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const  {roomnumber}  = req.body; 
        const hotelId = req.hotelId.hotelId;


        console.log(roomnumber);

        // Check if roomnumber is provided
        if (!roomnumber) {
            return res.status(400).send("Room number is required");
        }

        const result = await db.query(
            "DELETE FROM room WHERE roomnumber = $1 AND hotelid = $2", 
            [roomnumber, hotelId]
        );

        if (result.rowCount === 0) {
            return res.status(404).send("No such room exists");
        }

        res.status(200).send("Room deleted successfully");
    } catch (error) {
        console.error("Error deleting room:", error); // Log error for debugging
        res.status(500).send("Internal Server Error");
    }
};


exports.updateRoom = async (req, res) => {
    try {
        const { roomnumber, type, status, price } = req.body;
        const HotelId = req.hotelId.hotelId;
       
        if (!roomnumber) {
            return res.status(400).send("Room number is required");
        }


   
        const result = await db.query("SELECT * FROM room WHERE roomnumber = $1 AND hotelid = $2", [roomnumber, HotelId]);

        if (result.rowCount === 0) {
            return res.status(404).send("No such room exists");
        }


        let room = result.rows[0];


        if (type) {
            room.type = type;
        }
        if (status) {
            room.status = status;
        }
        if (price) {
            room.price = price;
        }


        const updateResult = await db.query(
            "UPDATE room SET type = $1, status = $2, price = $3 WHERE roomnumber = $4 and hotelid = $5",
            [room.type, room.status, room.price, roomnumber, HotelId]
        );

        if (updateResult.rowCount === 0) {
            return res.status(400).send("The row not found");
        }

        res.status(200).send("Room updated successfully");
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getHotelRooms = async (req, res) => {
    const hotelId = req.hotelId.hotelId; 
    console.log('hotelId:', hotelId); 
    
    try {
        const result = await db.query(
            "SELECT * FROM room WHERE room.hotelid = $1 AND room.status = 'Available'", 
            [hotelId]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "No available rooms found for this hotel." });
        }
        
        console.log(result.rows);
        
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching hotel rooms:", error);
       
        return res.status(500).json({ message: "Internal Server Error." });
    }
}
;


exports.getGuestRooms = async (req, res) => {
    const hotelId = req.params.hotelId;
    try {
        const result = await db.query("SELECT * FROM room where room.hotelid = $1 and room.status = 'Available'", [hotelId]);
        if (result.rowCount === 0) {
            return res.status(404).send("No such hotel found");
        }
        res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).send("Internal Server error", error);
    }
};


