const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../Middleware/authMiddleware'); // Adjust the path as necessary

router.post('/users', userController.createUser);
router.get('/users',authMiddleware, userController.getAllUsers);
router.get('/users/:id',authMiddleware, userController.getUserById);
router.put('/users/:id',authMiddleware, userController.updateUser);
router.delete('/users/:id',authMiddleware, userController.deleteUser);

module.exports = router;