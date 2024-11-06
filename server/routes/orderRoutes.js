const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const isAuth = require('../middleware/isAuth');
const isManager = require('./middleware/isManager');

router.post('/create', isAuth, orderController.createOrder);
router.get('/all', isManager, orderController.getOrders);
router.patch('/:orderId/status', isManager, orderController.updateOrderStatus);

module.exports = router; 