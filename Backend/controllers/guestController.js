const db = require('../config/db');

exports.createGuest = async (req, res) => {
    try {
        const { firstname, lastname, address, phone, email, password } = req.body;
        const result = await db.query(
            "INSERT INTO guest (fistname, lastname, address, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING guestid",
            [firstname, lastname, address, phone, email, password]
        );

        if (result.rowCount === 0) {
            return res.status(400).send("User registration failed");
        }

        const user = result.rows[0];

        res.status(200).json({
            message: "Successfully registered",
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};