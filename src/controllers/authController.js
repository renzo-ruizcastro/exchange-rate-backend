const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          username: user.username,
        },
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new Error('Please provide username and password');
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) throw new Error('User not found');
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) throw new Error('Incorrect password');
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          username: user.username,
        },
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token)
      throw new Error('You are not logged in! Please log in to get access');

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // Check if user still exists
    const freshUser = await User.findByPk(decoded.id);
    if (!freshUser)
      throw new Error('The user belonging to this token no longer exists');

    req.user = freshUser;
    next();
  } catch (e) {
    res.status(401).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.restrictsTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.dataValues.role))
        throw new Error('You do not have permission to perform this action');
      next();
    } catch (e) {
      res.status(401).json({
        status: 'fail',
        message: e.message,
      });
    }
  };
};
