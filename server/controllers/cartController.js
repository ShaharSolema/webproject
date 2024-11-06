const Cart = require('../models/Cart'); // Adjust the path as necessary

// Create or update a cart
exports.createOrUpdateCart = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        // Find and update or create new cart
        const cart = await Cart.findOneAndUpdate(
            { userId: userId },
            { items: items },
            { new: true, upsert: true }
        );

        // Populate product details
        await cart.populate('items.productId');
        
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error creating/updating cart:', error);
        return res.status(500).json({ 
            message: 'Error creating/updating cart', 
            error: error.message 
        });
    }
};

// Get a user's cart
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        
        if (!cart) {
            // If no cart exists, create an empty one
            cart = new Cart({
                userId: req.params.userId,
                items: []
            });
            await cart.save();
        }
        
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

// Update an item in the cart
exports.updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.params.userId });

        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({
                userId: req.params.userId,
                items: [{
                    productId: productId,
                    quantity: quantity
                }]
            });
        } else {
            // Find the item in the cart
            const itemIndex = cart.items.findIndex(item => 
                item.productId.toString() === productId.toString()
            );

            if (itemIndex > -1) {
                // Update existing item
                cart.items[itemIndex].quantity = quantity;
                // Remove item if quantity is 0
                if (quantity === 0) {
                    cart.items.splice(itemIndex, 1);
                }
            } else {
                // Add new item
                cart.items.push({
                    productId: productId,
                    quantity: quantity
                });
            }
        }

        await cart.save();
        // Populate product details before sending response
        await cart.populate('items.productId');
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Cart update error:', error);
        return res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
};

// Delete an item from the cart
exports.deleteCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the item to be deleted
        cart.items = cart.items.filter(i => !i.productId.equals(req.params.productId));

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting item from cart', error });
    }
};
