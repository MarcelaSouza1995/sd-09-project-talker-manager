const errors = require('../errors');

module.exports = (err, _req, res, _next) => {
  const body = { message: err.message };
  switch (err.constructor) {
    case errors.FileError:
      return res.status(503).json(body);
    default:
      return res.status(500).json(body);
  }
};