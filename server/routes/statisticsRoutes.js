const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const isManager = require("../Middleware/isManager");


// Route to get user registrations by month
router.get('/registrations', isManager, statisticsController.getUserRegistrations);

// Route to get product sales
router.get('/sales', isManager, statisticsController.getProductSales);

// Route to get items in shopping carts categorized by product ID
router.get('/cart-items', isManager, statisticsController.getItemsInCarts);

router.get('/income', isManager, statisticsController.getMonthlyIncome);
module.exports = router;
