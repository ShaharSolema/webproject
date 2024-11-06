const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const isAuth = require('../Middleware/authMiddleware');
const isManager = require('../Middleware/isManager');
const authenticate = require('../Middleware/authMiddleware');

router.post('/create', authenticate, orderController.createOrder);
router.get('/all', isManager, orderController.getOrders);
router.patch('/:orderId/status', isManager, orderController.updateOrderStatus);
router.get('/user/:userId', authenticate, orderController.getUserOrders);

module.exports = router; 