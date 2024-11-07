const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
    try {
        const { items, ...orderDetails } = req.body;
        
        // Validate stock levels for all items
        for (const item of items) {
            const product = await Product.findById(item.productId._id);
            
            if (!product) {
                console.error(`Product not found: ${item.productId.name}`);
                return res.status(400).json({
                    success: false,
                    message: `מוצר לא נמצא: ${item.productId.name}`
                });
            }

            if (product.stock < item.quantity) {
                console.error(`Insufficient stock for ${product.name}. Available: ${product.stock}`);
                return res.status(400).json({
                    success: false,
                    message: `כמות לא מספיקה במלאי עבור ${product.name}. כמות זמינה: ${product.stock}`
                });
            }

            // Ensure price is set for each item
            item.price = product.price;
        }

        // Create the order
        const order = new Order({
            ...orderDetails,
            items,
            user: req.user._id // Ensure user ID is set
        });
        await order.save();

        // Clear the user's cart
        await Cart.findOneAndUpdate(
            { userId: req.user._id },
            { items: [] }
        );

        res.status(201).json({
            success: true,
            orderId: order._id,
            purchaseNumber: order.purchaseNumber
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'אירעה שגיאה בביצוע ההזמנה'
        });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'firstname lastname email telephone')
            .populate('items.productId', 'name price');
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { 
                status,
                updatedAt: Date.now()
            },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId })
            .populate('user', 'firstname lastname email telephone')
            .populate('items.productId', 'name price');
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    updateOrderStatus,
    getUserOrders
}; 