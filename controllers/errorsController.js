const AppError = require('../utils/appError');

const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendError = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    msg: err.message,
  });
};

const selectHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message;

  switch (err.name) {
    case 'SequelizeValidationError': {
      error = handleValidationError(err);
      break;
    }
  }

  sendError(error, req, res);
};

module.exports = selectHandler;