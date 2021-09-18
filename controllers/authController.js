const { User } = require('../models');
const errorWrapper = require('../utils/controllerErrorHandler');

exports.createUser = errorWrapper(async (req, res, next) => {
  const user = await User.create(req.body.user);
  res.status(201).json({
    status: 'success',
    data: user,
  });
});
