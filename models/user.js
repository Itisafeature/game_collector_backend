'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Must have a username between 6 and 20 characters',
          },
          len: {
            args: [6, 20],
            msg: 'Username must be between 6 and 20 characters',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Must have provide an email',
          },
          isEmail: {
            msg: 'Must provide a valid email address',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Must have a password between 6 and 20 characters',
          },
          len: {
            args: [6, 20],
            msg: 'Password must be between 6 and 20 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.addHook('beforeValidate', (user, options) => {
    if (user.password !== options.passwordConfirmation) {
      throw new AppError('Password Confirmation does not match Password', 400);
    }
  });

  User.addHook('beforeCreate', async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  User.addScope('defaultScope', {
    attributes: ['id', 'username', 'password'],
  });

  return User;
};
