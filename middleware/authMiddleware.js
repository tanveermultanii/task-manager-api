const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // get token from request header

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), 'your_jwt_secret'); // verify token
        req.user = decoded.userId; // attach user ID to request
        next(); // continue to the next middleware
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
