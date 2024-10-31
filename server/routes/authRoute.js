const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require("../Middleware/authMiddleware");


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.get('/checkLogin', authenticate, authController.checkLoginStatus);


module.exports = router;