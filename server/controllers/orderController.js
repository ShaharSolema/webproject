const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentDetails, items, totalAmount, shippingCost } = req.body;
        const userId = req.user._id;

        // Create the order
        const order = new Order({
            user: userId,
            items: items.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            })),
            shippingAddress,
            paymentDetails,
            totalAmount,
            shippingCost,
            status: 'received'
        });

        await order.save();

        // Update product quantities and sales
        for (const item of items) {
            await Product.findByIdAndUpdate(item.productId._id, {
                $inc: {
                    stock: -item.quantity,
                    quantitysold: item.quantity
                }
            });
        }

        // Clear user's cart
        await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { items: [] } }
        );

        res.status(201).json({
            success: true,
            orderId: order._id
        });

    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order'
        });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
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

module.exports = {
    createOrder,
    getOrders,
    updateOrderStatus
}; 