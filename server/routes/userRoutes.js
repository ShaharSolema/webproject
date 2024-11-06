const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isManager = require("../Middleware/isManager");
const authenticate = require('../Middleware/authMiddleware');

router.get('/', authenticate, isManager, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id',authenticate,isManager, userController.deleteUser);

module.exports = router;