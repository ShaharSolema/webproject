const Cart = require('../models/Cart');
const Product = require('../models/Product');

const cleanupDeletedProducts = async () => {
    try {
        // Get all carts
        const carts = await Cart.find({});
        
        for (const cart of carts) {
            // Check each item in the cart
            const validItems = [];
            
            for (const item of cart.items) {
                const productExists = await Product.exists({ _id: item.productId });
                if (productExists) {
                    validItems.push(item);
                }
            }
            
            // Update cart if items were removed
            if (validItems.length !== cart.items.length) {
                cart.items = validItems;
                await cart.save();
                console.log(`Cleaned up cart ${cart._id}: removed ${cart.items.length - validItems.length} deleted products`);
            }
        }
    } catch (error) {
        console.error('Error during cart cleanup:', error);
    }
};

module.exports = cleanupDeletedProducts; 