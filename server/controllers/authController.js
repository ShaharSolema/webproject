const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserController=require('./userController');
const config = require('../config/config');


const registerUser = async (req, res) => {
  try {
    const { username } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User(req.body);
    const newUser=await user.save(); 


    const token = generateToken(newUser._id.toString());

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(201).json({ user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString());

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging out', error });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '1h' });
};

const checkLoginStatus = (req, res) => {
  if (req.user) {
    return res.status(200).json({ isLoggedIn: true, user: req.user });
  } else {
    return res.status(401).json({ isLoggedIn: false });
  }
};

module.exports = { registerUser, loginUser, logoutUser, checkLoginStatus };
