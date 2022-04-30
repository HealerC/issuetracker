const CustomError = require('./custom-error.js');

class BadRequestError extends CustomError {
  constructor(message, cause) {
    super(message);
    this.statusCode = 400;
    this.cause = cause || null;
  }
}
module.exports = BadRequestError;