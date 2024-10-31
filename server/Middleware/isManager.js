const isManager = (req, res, next) => {
    if (req.user && req.user.manager) {
      next(); // User is a manager, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Access denied. Manager privileges required.' });
    }
  };
  
  module.exports = isManager;
  