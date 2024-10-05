const db = require('../config/db');
const {  generateToken, verifyToken,} = require('../utils/jwt');
const bycrpt = require('bcryptjs')

exports.loginHotel = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(password);
        
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const result = await db.query("SELECT email, password, hotelid FROM hotel WHERE email = $1", [email]);

        if (result.rowCount === 0) {
            return res.status(404).send("No data found");
        }

        const user = result.rows[0];
        if (await bycrpt.compare(password , user.password) === false) {
            return res.status(401).send("Incorrect password");
        }
        
        const token = generateToken(user.hotelid);
        console.log("token ", token);
        req.hotelid = user.hotelid
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send("Internal Server Error");
    }
};


exports.loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await db.query("SELECT * FROM guest WHERE email = $1", [email]);

        console.log(email, password);
        console.log(result.rows[0]);

        if (result.rowCount === 0) {
            return res.status(400).send("No such Email exists. Try to signup");
        }

        const customer = result.rows[0];
        if (customer.password !== password) {
            return res.status(401).send("Incorrect password");
        }
        
        req.guestId = customer.guestid
        console.log(req.guestId)
        const token = generateToken(customer.guestid);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};


