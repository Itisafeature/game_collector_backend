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
    },
    {
      sequelize,
      modelName: 'Game',
    }
  );
  return Game;
};
