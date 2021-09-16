const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sequelizeDB = async () => await sequelize.sync();
sequelizeDB();

const { User } = require('./models');

const createUserFunc = async () => {
  try {
    console.log(
      await User.create({
        username: 'name',
        email: 'email',
        password: 'password',
      })
    );
  } catch (err) {
    console.log(err);
  }
};
createUserFunc();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
