const CustomError = require('./custom-error.js');

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = BadRequestError;