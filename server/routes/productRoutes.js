const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const isManager = require("../Middleware/isManager");
const authenticate = require("../Middleware/authMiddleware");

// Public routes (no authentication required)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get("/search", productController.advancedSearch);

// Protected routes (require authentication)
router.post('/', authenticate, isManager, productController.createProduct);
router.put('/:id', authenticate, isManager, productController.updateProduct);
router.delete('/:id', authenticate, isManager, productController.deleteProduct);

module.exports = router;