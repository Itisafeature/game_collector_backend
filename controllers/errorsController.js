const AppError = require('../utils/appError');

const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = err => {
  const message = 'User is not authenticated';
  return new AppError(message, 401);
};

const sendError = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    errMsg: err.message,
  });
};

const selectHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message; // Not sure why it's not copied

  switch (err.name) {
    case 'SequelizeValidationError': {
      error = handleValidationError(err);
      break;
    }
    case 'SequelizeUniqueConstraintError': {
      error.message = `${error.errors[0].message.replace(
        / .*/,
        ''
      )} already exists`;
      error = handleValidationError(err);
      break;
    }
    case 'JsonWebTokenError': {
      error = handleJsonWebTokenError(error);
      break;
    }
  }

  sendError(error, req, res);
};

module.exports = selectHandler;
