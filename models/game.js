'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Rating, {
        foreignKey: 'gameId',
        as: 'rating',
      });
      this.belongsToMany(models.User, {
        through: models.WantedGame,
        foreignKey: 'gameId',
        as: 'UsersWhoWant',
      });
      this.belongsToMany(models.User, {
        through: models.OwnedGame,
        foreignKey: 'gameId',
        as: 'UsersWhoOwn',
      });
    }
  }
  Game.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Game',
    }
  );

  Game.addHook('beforeCreate', async (game, options) => {
    game.slug = game.title.toLowerCase().replace(/\s+/g, '-');
  });

  return Game;
};
