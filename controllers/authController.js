const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorWrapper = require('../utils/controllerErrorHandler');
const AppError = require('../utils/appError');

const createAndAddToken = (user, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 3600, // 10 min
  });

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
};

exports.verifyToken = errorWrapper(async (req, res, next) => {
  const token = jwt.verify(
    req.cookies.access_token,
    process.env.JWT_SECRET,
    err => {
      if (err) next(err);
    }
  );
});

exports.createUser = errorWrapper(async (req, res, next) => {
  const user = await User.create(req.body.user);
  createAndAddToken(user, res);
  res.status(201).json({
    status: 'success',
    data: user,
  });
});

exports.loginUser = errorWrapper(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const auth = await bcrypt.compare(req.body.password, user.password);
    if (auth) {
      createAndAddToken(user, res);
      return res.status(200).json({
        status: 'success',
        data: user,
      });
    }
  }
  next(new AppError('Invalid Username or Password', 401));
});

exports.logoutUser = async (req, res, next) => {
  res.cookie('access_token', 'loggedout', {
    expires: new Date(Date.now() + 10),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
