const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
    try {
        const { items, ...orderDetails } = req.body;
        
        // Validate all products exist and have sufficient stock
        for (const item of items) {
            const product = await Product.findById(item.productId._id);
            
            if (!product) {
                // Remove deleted product from user's cart
                await Cart.findOneAndUpdate(
                    { userId: req.user._id },
                    { $pull: { items: { productId: item.productId._id } } }
                );

                return res.status(400).json({
                    success: false,
                    message: `המוצר "${item.productId.name}" אינו זמין יותר במערכת. הוסר מהעגלה.`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `כמות לא מספיקה במלאי עבור ${product.name}. כמות זמינה: ${product.stock}`
                });
            }

            // Update product stock and quantitysold
            await Product.findByIdAndUpdate(product._id, {
                $inc: {
                    stock: -item.quantity,
                    quantitysold: item.quantity
                }
            });

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
            .populate('items.productId', 'name price imageUrl');
        
        const formattedOrders = orders.map(order => {
            const orderObj = order.toObject();
            
            // טיפול בפרטי המשתמש
            if (orderObj.user) {
                orderObj.userDetails = {
                    firstname: orderObj.user.firstname,
                    lastname: orderObj.user.lastname,
                    email: orderObj.user.email,
                    telephone: orderObj.user.telephone,
                    isDeleted: false
                };
            }
            
            // טיפול בפרטי המוצרים
            orderObj.items = orderObj.items.map(item => {
                if (item.productId) {
                    // אם המוצר עדיין קיים
                    item.productDetails = {
                        name: item.productId.name,
                        price: item.productId.price,
                        imageUrl: item.productId.imageUrl,
                        isDeleted: false
                    };
                }
                // אם המוצר נמחק, משתמשים בפרטים השמורים
                // productDetails כבר קיים במסמך
                
                delete item.productId;
                return item;
            });

            delete orderObj.user;
            return orderObj;
        });
        
        res.json(formattedOrders);
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
        
        // המרת המידע לפורמט אחיד
        const formattedOrders = orders.map(order => {
            const orderObj = order.toObject();
            
            // אם המשתמש קיים, השתמש בפרטים שלו
            if (orderObj.user) {
                orderObj.userDetails = {
                    firstname: orderObj.user.firstname,
                    lastname: orderObj.user.lastname,
                    email: orderObj.user.email,
                    telephone: orderObj.user.telephone,
                    isDeleted: false
                };
            }
            // אם המשתמש לא קיים, השתמש בפרטים השמורים
            // userDetails כבר קיים במסמך

            delete orderObj.user; // הסר את אובייקט המשתמש המקורי
            return orderObj;
        });
        
        res.json(formattedOrders);
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