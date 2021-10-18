const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorWrapper = require('../utils/controllerErrorHandler');
const AppError = require('../utils/appError');

const createAndAddToken = (user, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 360000, // 100 hours
  });

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
};

exports.verifyToken = errorWrapper(async (req, res, next) => {
  jwt.verify(
    req.cookies.access_token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) next(err);
      req.userId = decoded.id;
    }
  );
  next();
});

const loginAndSendResponse = async (res, statusCode, user, games) => {
  createAndAddToken(user, res);
  delete user.dataValues.password;
  delete user.dataValues.email;
  return res.status(statusCode).json({
    status: 'success',
    data: {
      user,
      games,
    },
  });
};

exports.tokenVerified = errorWrapper(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'Token Verified',
  });
});

exports.createUser = errorWrapper(async (req, res, next) => {
  const user = await User.create(req.body.user, {
    passwordConfirmation: req.body.user.passwordConfirmation,
  });
  const games = { ownedGames: [], wantedGames: [] };
  loginAndSendResponse(res, 201, user, games);
});

exports.loginUser = errorWrapper(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.user.email } });
  if (user) {
    const auth = await bcrypt.compare(req.body.user.password, user.password);
    if (auth) {
      const games = {
        ownedGames: await user.getGamesOwned(),
        wantedGames: await user.getGamesWanted(),
      };
      return loginAndSendResponse(res, 200, user, games);
    }
  }
  next(new AppError('Invalid Username or Password', 401)); // Error Won't work for problem with loading
});

exports.logoutUser = async (req, res, next) => {
  res.cookie('access_token', 'loggedout', {
    expires: new Date(Date.now() + 10),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
