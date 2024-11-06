const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isManager = require("../Middleware/isManager");

router.get('/', isManager, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id',isManager, userController.deleteUser);

module.exports = router;