// utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const generateToken = (hotelId) => {
    return jwt.sign({ hotelId }, secret, { expiresIn: '1h' });
};


const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded; 
    } catch (error) {
        console.error('Token verification failed:', error);
        return null; // Return null if verification fails
    }
};


module.exports = { generateToken, verifyToken };
