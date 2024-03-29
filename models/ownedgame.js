'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OwnedGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  OwnedGame.init(
    {
      purchasePrice: DataTypes.INTEGER,
      gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OwnedGame',
    }
  );
  return OwnedGame;
};
