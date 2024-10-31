// routes/cartRoutes.js
const express = require('express');
const cartController = require('../controllers/cartController'); // Adjust the path as necessary
const router = express.Router();

// Create or update a cart
router.post('/', cartController.createOrUpdateCart);

// Get a user's cart
router.get('/:userId', cartController.getCart);

// Update an item in the cart
router.put('/:userId', cartController.updateCartItem);

// Delete an item from the cart
router.delete('/:userId/:productId', cartController.deleteCartItem);

module.exports = router;
