'use strict';
const axios = require('axios');
const { Game, Rating, User, OwnedGame, WantedGame } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.destroy({ where: {} });
    await WantedGame.destroy({ where: {} });
    await OwnedGame.destroy({ where: {} });
    await Game.destroy({ where: {} });
    await Rating.destroy({ where: {} });

    const user = await User.create({
      username: 'newuser',
      email: 'newmail@mail.com',
      password: 'password',
    });

    let count = 1;

    while (count < 40) {
      const res = await axios.get(
        `https://api.rawg.io/api/games?exlude_additions=true&page=${count}&page_size=40&-rating&key=${process.env.RAWG_API_KEY}`
      );

      const gameData = res.data.results;

      let evenOrOdd = 1;

      for (const game of gameData) {
        const createdGame = await Game.create({
          title: game.name,
          image: game.background_image,
        });

        await createdGame.createRating({
          exceptional: game.ratings[0].count,
          recommended: game.ratings[1].count,
          meh: game.ratings[2].count,
          skip: game.ratings[3].count,
          total: game.ratings_count,
        });

        count % 2 === 0
          ? await WantedGame.create({
              userId: user.id,
              gameId: createdGame.id,
            })
          : await OwnedGame.create({
              userId: user.id,
              gameId: createdGame.id,
            });

        evenOrOdd++;
      }
      count++;
    }

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
