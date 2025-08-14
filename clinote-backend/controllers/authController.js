const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');

// @route POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendErrorResponse(res, 400, 'User already exists');
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    };

    return sendSuccessResponse(res, 201, 'User registered successfully', userData);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Registration failed', err);
  }
};

// @route POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return sendErrorResponse(res, 401, 'Invalid credentials');
    }

    const token = generateToken(user._id);
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    };

    return sendSuccessResponse(res, 200, 'Login successful', userData);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Login failed', err);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    return sendSuccessResponse(res, 200, 'Profile retrieved successfully', user);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to retrieve profile', err);
  }
};