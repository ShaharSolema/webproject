const mongoose = require("mongoose");
const { validateIsraeliCreditCard } = require('../utils/creditCardValidation');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  shippingAddress: {
    street: {
      type: String,
      required: function() {
        return this.shippingMethod !== 'pickup';
      },
      trim: true
    },
    city: {
      type: String,
      required: function() {
        return this.shippingMethod !== 'pickup';
      },
      trim: true
    },
    zipCode: {
      type: String,
      required: function() {
        return this.shippingMethod !== 'pickup';
      },
      trim: true
    },
    phone: {
      type: String,
      required: function() {
        return this.shippingMethod !== 'pickup';
      },
      trim: true
    }
  },
  shippingMethod: {
    type: String,
    required: true,
    enum: ['pickup', 'israel-post', 'courier']
  },
  paymentDetails: {
    cardHolder: {
      type: String,
      required: true,
      trim: true
    },
    cardNumber: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return validateIsraeliCreditCard(v);
        },
        message: 'מספר כרטיס האשראי אינו תקין'
      }
    },
    expiry: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          // Check format MM-YY
          if (!/^\d{2}-\d{2}$/.test(v)) return false;
          
          const [month, year] = v.split('-').map(num => parseInt(num, 10));
          
          // Validate month (1-12)
          if (month < 1 || month > 12) return false;
          
          // Validate expiry date
          const now = new Date();
          const currentYear = now.getFullYear() % 100; // Get last 2 digits
          const currentMonth = now.getMonth() + 1; // 1-12
          
          // Check if card is not expired
          if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return false;
          }
          
          return true;
        },
        message: 'תאריך תפוגה אינו תקין'
      }
    },
    lastFourDigits: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{4}$/.test(v);
        },
        message: '4 ספרות אחרונות אינן תקינות'
      }
    }
  },
  status: {
    type: String,
    enum: ['received', 'packed', 'shipped', 'delivered', 'cancelled'],
    default: 'received'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    required: true,
    default: 20
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  purchaseNumber: {
    type: String,
    unique: true
  }
});

// Add a pre-save middleware to format the card number
orderSchema.pre('save', function(next) {
  if (this.isModified('paymentDetails.cardNumber')) {
    // Format card number with dashes
    const clean = this.paymentDetails.cardNumber.replace(/\D/g, '');
    this.paymentDetails.cardNumber = `${clean.slice(0,4)}-${clean.slice(4,8)}-${clean.slice(8,12)}-${clean.slice(12)}`;
    
    // Set last four digits
    this.paymentDetails.lastFourDigits = clean.slice(-4);
  }
  next();
});

// Add a pre-save middleware to generate purchase number
orderSchema.pre('save', async function(next) {
  if (!this.purchaseNumber) {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2); // Get last 2 digits of year
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Get month (01-12)
    
    // Find the last order from current month
    const lastOrder = await this.constructor.findOne(
      {
        purchaseNumber: new RegExp(`^${year}${month}`)
      }, 
      { purchaseNumber: 1 },
      { sort: { purchaseNumber: -1 } }
    );

    let sequence = '001';
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.purchaseNumber.slice(-3));
      sequence = (lastSequence + 1).toString().padStart(3, '0');
    }

    this.purchaseNumber = `${year}${month}${sequence}`;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order; 