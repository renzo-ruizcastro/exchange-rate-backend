const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({
      status: 'success',
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

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) throw new Error('No user found with that ID');
    const updated = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated[0]) throw new Error('Something went wrong');
    const updatedUser = await User.findByPk(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
    });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};
