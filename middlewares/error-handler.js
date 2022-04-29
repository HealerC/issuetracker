const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong, try again later'
  }
  if (err.name === 'ValidationError') {
    customError.statusCode = 400;
    customError.message = { error: "required field(s) missing" }
  }
  return res.status(customError.statusCode).json(customError.message);
}
module.exports = errorHandler;