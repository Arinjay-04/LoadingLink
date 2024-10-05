const db = require('../config/db');

exports.addEmployee = async (req, res) => {
    try {
        const { firstname, lastname, position, salary, contact } = req.body;
        const hotelId = req.hotelId;

        const result = await db.query("INSERT INTO employee(firstname, lastname, position, salary, contact, hotelid) VALUES ($1, $2, $3, $4, $5, $6)", [firstname, lastname, position, salary, contact, hotelId]);

        if (result.rowCount === 0) {
            return res.status(400).send("Failed to insert data");
        }

        res.status(200).send('Success...!!!');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

