const errorWrapper = require('../utils/controllerErrorHandler');
const { Game, Rating } = require('../models');
const { restart } = require('nodemon');

exports.getGames = errorWrapper(async (req, res, next) => {
  const games = await Game.findAll({ include: ['rating'] });
  // console.log(games);
  res.status(200).json({
    status: 'success',
    data: games,
  });
});
