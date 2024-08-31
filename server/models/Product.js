const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
//ADD VALIDATIONS!!!
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["Fruit", "Veggie", "Dairy"],
  },
});
//export the module
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
