const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');


const authenticate = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token!' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    // Attach the user to the request object
    const user = await User.findById(decoded.id).select('-password').exec();

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: 'Not authorized, user not found' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = authenticate;
