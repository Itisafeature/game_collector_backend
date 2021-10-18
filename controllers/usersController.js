const errorWrapper = require('../utils/controllerErrorHandler');
const { User } = require('../models');

exports.getGames = errorWrapper(async (req, res, next) => {
  const games = await Game.findAll({ include: ['rating'] });

  res.status(200).json({
    status: 'success',
    data: games,
  });
});
