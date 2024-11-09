// controllers/statisticsController.js
const User = require('../models/User'); // Path to User model
const Product = require('../models/Product'); // Path to Product model
const Cart = require('../models/Cart'); // Path to Cart model
const Order = require('../models/Order');

// Get user registrations by month
const getUserRegistrations = async (req, res) => {
  try {
    const userRegistrations = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    res.json(userRegistrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product sales count
const getProductSales = async (req, res) => {
  try {
    const productSales = await Product.aggregate([
      {
        $unwind: "$categories"  // פיצול מערך הקטגוריות
      },
      {
        $group: {
          _id: {
            name: "$name",
            categories: "$categories"
          },
          totalSales: { $sum: "$quantitysold" },
        },
      },
      {
        $project: {
          productName: "$_id.name",
          categories: "$_id.categories",
          totalSales: 1,
          _id: 0,
        },
      },
      {
        $sort: { totalSales: -1 }
      }
    ]);
    
    
    res.json(productSales);
  } catch (error) {
    console.error('Error in getProductSales:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get items in shopping carts categorized by product ID
const getItemsInCarts = async (req, res) => {
  try {
    const cartItems = await Cart.aggregate([
      { $unwind: "$items" }, // Flatten the items array
      {
        $lookup: {
          from: "products", // Name of the products collection
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" }, // Flatten product details
      {
        $group: {
          _id: "$items.productId", // Group by product ID
          totalQuantity: { $sum: "$items.quantity" }, // Sum the quantities
        },
      },
      {
        $lookup: {
          from: "products", // Join again to get product details
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" }, // Flatten product information
      {
        $project: {
          productId: "$_id",
          totalQuantity: 1,
          productName: "$productInfo.name", // Include product name
          _id: 0,
        },
      },
    ]);
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get monthly income
const getMonthlyIncome = async (req, res) => {
    try {
        const monthlyIncome = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalIncome: { $sum: "$totalAmount" }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            {
                $project: {
                    month: {
                        $concat: [
                            { $toString: "$_id.year" },
                            "-",
                            { $toString: "$_id.month" }
                        ]
                    },
                    totalIncome: 1,
                    _id: 0
                }
            }
        ]);

        // If no sales data exists, return an array with current month and 0 income
        if (monthlyIncome.length === 0) {
            const currentDate = new Date();
            const defaultData = [{
                month: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`,
                totalIncome: 0
            }];
            return res.json(defaultData);
        }

        res.json(monthlyIncome);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getUserRegistrations,
  getProductSales,
  getItemsInCarts,
  getMonthlyIncome
};
