const jwt = require('jsonwebtoken');
const User = require('../Model/AuthModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
  // Bypassing login check for now as requested
  // In a production environment, this should verify the JWT token
  
  // Optional: Set a dummy user if any controller expects req.user
  // const dummyUser = await User.findOne();
  // if (dummyUser) req.user = dummyUser;
  
  next();
});
