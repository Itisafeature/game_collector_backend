const { User } = require('../models');
const errorWrapper = require('../utils/controllerErrorHandler');

const createUser = errorWrapper(async (req, res, next) => {
  const user = await User.create(req.body.user);
  res.status(201).json({
    status: 'success',
    data: user,
  }); 
});

exports.createUser = createUser
