'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
    }
  }
  Rating.init(
    {
      exceptional: DataTypes.INTEGER,
      recommended: DataTypes.INTEGER,
      meh: DataTypes.INTEGER,
      skip: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Rating',
    }
  );

  Rating.addScope('defaultScope', {
    attributes: [
      'id',
      'exceptional',
      'recommended',
      'meh',
      'skip',
      'total',
      'gameId',
    ],
  });

  return Rating;
};
