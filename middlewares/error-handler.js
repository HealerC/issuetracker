const CustomError = require('../errors/custom-error.js');

const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong, try again later'
  }

  /* Invalid ObjectID */
  if (err.name === 'CastError') {
    customError.statusCode = 400;
    const method = req.method;
    switch(method) {
      case 'GET':   // On filtering the issues with queries
        customError.message = { 
          error: "_id provided for query is invalid", 
          _id: req.query._id 
        }
      case 'PUT':   // On updating
        customError.message = { 
          error: "could not update", 
          _id: req.body._id 
        }
        break;
      case 'DELETE':    // On deleting
        customError.message = { 
          error: "could not delete", 
          _id: req.body._id 
        }
        break;
      default:
        customError.message = {
          error: "ObjectID provided is invalid"
        }
    } 
  }

  /* e.g. Characters more than minlength, required fields not sent */
  if (err.name === 'ValidationError') {
    customError.statusCode = 400;
    customError.message = { error: "required field(s) missing" }
  }
 
  /* Custom error thrown during program execution */
  if (err instanceof CustomError) {
    customError.statusCode = err.statusCode;
    customError.message = err.cause ? { error: err.message, ...err.cause } :
                                      { error: err.message }
  }
  
  // Default error code because of fcc testing
  return res.json(customError.message);
}
module.exports = errorHandler;