const db = require('../config/db');
const { generateToken, verifyToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

// Login for Hotel
exports.loginHotel = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        
        const result = await db.query("SELECT email, password, hotelid FROM hotel WHERE email = $1", [email]);

       
        if (result.rowCount === 0) {
            return res.status(404).send("No data found");
        }

        const user = result.rows[0];

       
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("Incorrect password");
        }

       
        const token = generateToken(user.hotelid);
        const optionals = {
            httpOnly: true,
            secure: true 
        };

        req.hotelid = user.hotelid;

        
        return res.status(200).cookie("accessToken", token, optionals).json({ token });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send("Internal Server Error");
    }
};

// Login for Customer
exports.loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

       
        const result = await db.query("SELECT * FROM guest WHERE email = $1", [email]);

       
        if (result.rowCount === 0) {
            return res.status(400).send("No such Email exists. Try to signup");
        }

        const customer = result.rows[0];

       
        if (!(await bcrypt.compare(password, customer.password))) {
            return res.status(401).send("Incorrect password");
        }

        
        const token = generateToken(customer.guestid);
        const optionals = {
            httpOnly: true,
            secure: true 
        };

        req.guestId = customer.guestid;

        return res.status(200).cookie("accessToken", token, optionals).json({ token });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send("Internal Server Error");
    }
};
