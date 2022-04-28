const errorHandler = (err, req, res, next) => {
  return res.send(err || err.message);
}
module.exports = errorHandler;