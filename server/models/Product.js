const mongoose = require("mongoose");
const validator = require("validator");
const { default: isURL } = require("validator/lib/isURL");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
    validate: {
      validator: function (v) {
        return (
          validator.isAlpha(v, "he", { ignore: " " }) ||
          validator.isAlpha(v, "en-US", { ignore: " " })
        );
      },
      message: (props) => `${props.value} is not a valid product name`,
    },
  },
  description: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 60,
    validate: {
      validator: function (v) {
        return (
          validator.isAlpha(v, "he", { ignore: " " }) ||
          validator.isAlpha(v, "en-US", { ignore: " " })
        );
      },
      message: (props) => `${props.value} is not a valid description`,
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discount:{
    type:Number,//in %
    required:false,
    min:0,
    max:100,
    validator: function (v) {
      return validator.isNumeric(v.toString(), { no_symbols: true });
    },
    message: (props) => `${props.value} is not a valid discount(%)`,
  },
  categories: [{
    type: String,
    required: true,
    enum: ['ראשי הסרה', 'ראשי מניקור', 'כלי מניקור', 'בייסים', 'טופים', 'גלים', 'בנייה והשלמה', 'מכחולים', 'קישוטים', 'חד פעמי', 'אקסטרה'],
}],
stock: {
  type: Number,
  required: true,
  min: 0,
  validator: function (v) {
    return validator.isNumeric(v.toString(), { no_symbols: true });
  },
  message: (props) => `${props.value} is not a valid stock number`,
},
imageUrl: {
  type: String,
  trim: true,
  validator: function(v) {
    return validator.isURL(v.toString());
  },
  message: (props)=> `${props.value} is not a valid URL`
},
quantitysold: {
  type: Number,
  required: false,
  default: 0
},
createdAt: {
  type: Date,
  default: Date.now
}
});

//export the module
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
