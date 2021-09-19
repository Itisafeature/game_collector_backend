const { User } = require('../models');
const jwt = require('jsonwebtoken');
const errorWrapper = require('../utils/controllerErrorHandler');

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
