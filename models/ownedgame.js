'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OwnedGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OwnedGame.init({
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    } 
    purchasePrice: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OwnedGame',
  });
  return OwnedGame;
};