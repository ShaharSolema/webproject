const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const isManager = require("./Middleware/isManager");

router.post('/',isManager, productController.createProduct);
router.get('/',isManager, productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id',isManager, productController.deleteProduct);
router.get("/search", productController.advancedSearch);

module.exports = router;