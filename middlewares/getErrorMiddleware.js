const HTTP_ERROR_STATUS = 200;

function getErrorMiddleware(err, _req, res, _next) {
  return res.status(HTTP_ERROR_STATUS).json({ message: err.message });
}

module.exports = getErrorMiddleware;
