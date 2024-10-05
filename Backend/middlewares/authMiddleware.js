const { verifyToken } = require('../utils/jwt');

const authMiddlewareHotel = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.error('Unauthorized: No token provided');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }


    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        console.error('Unauthorized: Invalid token format');
        return res.status(401).json({ message: 'Unauthorized: Invalid token format. Expected "Bearer <token>"' });
    }

    
    const token = tokenParts[1];
    
    try {
      
        const hotelId = verifyToken(token); 
      
        if (!hotelId) {
            console.error('Unauthorized: Invalid token');
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.hotelId = hotelId;
        next();
    } catch (error) {
        console.error('Unauthorized: Token verification failed', error);
        return res.status(401).json({ message: 'Unauthorized: Token verification failed', error });
    }
};


const authMiddlewareGuest = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.error('Unauthorized: No token provided');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    
    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        console.error('Unauthorized: Invalid token format');
        return res.status(401).json({ message: 'Unauthorized: Invalid token format. Expected "Bearer <token>"' });
    }

    
    const token = tokenParts[1];
    
    try {
        const userId = verifyToken(token);

        
        if (!userId) {
            console.error('Unauthorized: Invalid token');
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        
        req.userId = userId;
        next();
    } catch (error) {
        
        console.error('Unauthorized: Token verification failed', error);
        return res.status(401).json({ message: 'Unauthorized: Token verification failed', error });
    }
};


module.exports = {
    authMiddlewareHotel,
    authMiddlewareGuest
};