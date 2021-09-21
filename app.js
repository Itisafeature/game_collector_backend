const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

(async () => await sequelize.sync())();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const GlobalErrorHandler = require('./controllers/errorsController');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'Not Found',
    msg: 'Route Not Found',
  });
});
app.use(GlobalErrorHandler);

module.exports = app;
