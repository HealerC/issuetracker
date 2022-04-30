const CustomError = require('../errors/custom-error.js');

const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong, try again later'
  }
  if (err.name === 'ValidationError') {
    customError.statusCode = 400;
    customError.message = { error: "required field(s) missing" }
  }
  if (err instanceof CustomError) {
    customError.statusCode = err.statusCode;
    customError.message = { error: err.message }
  }
  return res.status(customError.statusCode).json(customError.message);
}
module.exports = errorHandler;