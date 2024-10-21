const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Adjust the path as necessary

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = decoded; // Store user data in request for later use
    next();
  });
};

module.exports = authMiddleware;
