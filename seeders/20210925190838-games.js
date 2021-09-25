'use strict';
const axios = require('axios');
const { Game, Rating } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let count = 1;
    while (count < 40) {
      const res = await axios.get(
        `https://api.rawg.io/api/games?exlude_additions=true&page=${count}&page_size=40&-rating&key=${process.env.RAWG_API_KEY}`
      );

      const gameData = res.data.results;

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
