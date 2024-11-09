const Product = require('../models/Product');
const Order = require('../models/Order');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
exports.updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedProduct => {
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json(updatedProduct);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // עדכון כל ההזמנות שמכילות את המוצר
    await Order.updateMany(
      { 'items.productId': productId },
      { 
        $set: {
          'items.$[elem].productDetails': {
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            isDeleted: true,
            deletedAt: new Date()
          },
          'items.$[elem].productId': null
        }
      },
      { 
        arrayFilters: [{ 'elem.productId': productId }],
        multi: true 
      }
    );

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: error.message });
  }
};

// Advanced Search
exports.advancedSearch = async (req, res) => {
  try {
    const { minPrice, maxPrice, discountRate, categories, inStock } = req.query;

    // Build the query object
    let query = {};

    if (minPrice) query.price = { $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (discountRate) query.discount = { $gte: Number(discountRate) };
    if (categories) query.categories = { $in: categories.split(',') };
    if (inStock !== undefined) query.stock = { $gt: 0 };

    // Find products based on the query
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};