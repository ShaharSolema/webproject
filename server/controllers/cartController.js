const Cart = require('../models/Cart'); // Adjust the path as necessary

// Create or update a cart
exports.createOrUpdateCart = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;
        // Check if the cart for this user already exists
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Update the cart with new items or update existing ones
            items.forEach(item => {
                const existingItem = cart.items.find(i => i.productId.equals(item.productId));
                if (existingItem) {
                    existingItem.quantity += item.quantity; // Update quantity
                } else {
                    cart.items.push(item); // Add new item
                }
            });
            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart
            cart = new Cart({ userId, items });
            await cart.save();
            return res.status(201).json(cart);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error creating/updating cart', error });
    }
};

// Get a user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching cart', error });
    }
};

// Update an item in the cart
exports.updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId: req.params.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(i => i.productId.equals(productId));
        if (item) {
            item.quantity = quantity; // Update quantity
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating cart', error });
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
