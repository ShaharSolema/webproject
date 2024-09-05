const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  appointments: [{
    date: { type: Date },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  }]
});

module.exports = mongoose.model('Client', clientSchema);
