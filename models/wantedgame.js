'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WantedGame extends Model {
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
  WantedGame.init(
    {
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
      modelName: 'WantedGame',
    }
  );
  return WantedGame;
};
