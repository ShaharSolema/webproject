const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    createdAt: { type: Date, default: Date.now }
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  module.exports = Cart;
