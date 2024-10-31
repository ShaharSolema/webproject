const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const saltRounds = 10;

// Password validation function
const passwordValidator = function (password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

// Define the User schema
const userSchema = new Schema({
  street: {
    type: String,
    minlength: 5,
    maxlength: 30,
    validate: {
      validator: function (v) {
        return validator.isAlpha(v, "he", { ignore: " " }) || validator.isAlpha(v, "en-US", { ignore: " " });
      },
      message: (props) => `${props.value} is not a valid street name`,
    },
  },
  streetnum: {
    type: Number,
    validate: {
      validator: function (v) {
        return Number.isInteger(v) && v > 0;
      },
      message: (props) => `${props.value} is not a valid street number`,
    },
  },
  postalcode: {
    type: Number,
    validate: {
      validator: function (v) {
        return validator.isNumeric(v.toString(), { no_symbols: true });
      },
      message: (props) => `${props.value} is not a valid postal code`,
    },
  },
  city: {
    type: String,
    minlength: 5,
    maxlength: 30,
    validate: {
      validator: function (v) {
        return validator.isAlpha(v, "he", { ignore: " " }) || validator.isAlpha(v, "en-US", { ignore: " " });
      },
      message: (props) => `${props.value} is not a valid city name`,
    },
  },
  telephone: {
    type: String,
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, "he-IL");
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
  birthday: {
    type: Date,
    validate: {
      validator: function (v) {
        return validator.isDate(v);
      },
      message: (props) => `${props.value} is not a valid date`,
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [6, "Length must be at least 6 characters long"],
    validate: {
      validator: function (v) {
        return validator.isAlphanumeric(v, "en-US");
      },
      message: (props) => `${props.value} contains invalid characters!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: passwordValidator,
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, and special characters.",
    },
  },
  manager: {
    type: Boolean,
    required: true,
    default: false,
    immutable: true,
    validate: {
      validator: function(v) {
        return v === false;
      },
      message: "This field must always be false."//manager
    }
  },
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    validate: {
      validator: function (v) {
        return validator.isAlpha(v, "he", { ignore: " " }) || validator.isAlpha(v, "en-US", { ignore: " " });
      },
      message: (props) => `${props.value} contains invalid characters!`,
    },
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    validate: {
      validator: function (v) {
        return validator.isAlpha(v, "he", { ignore: " " }) || validator.isAlpha(v, "en-US", { ignore: " " });
      },
      message: (props) => `${props.value} contains invalid characters!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual getter for full name
userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// Virtual getter for full address
userSchema.virtual("fulladdress").get(function () {
  return `${this.street} ${this.streetnum} ${this.city} ${this.postalcode} Israel`;
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip hashing if password hasn't changed

  try {
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
