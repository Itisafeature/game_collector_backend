const { User } = require('../models');

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
  } catch (err) {
    next(err);
  }
};
