const errorHandler = (err, req, res, next) => {
  return res.send(err.message);
}
module.exports = errorHandler;