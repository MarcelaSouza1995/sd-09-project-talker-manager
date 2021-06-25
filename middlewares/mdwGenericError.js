const mdwGenericError = (err, _req, res, _next) => {
  const errorStatus = err.status || 500;
  return res.status(errorStatus).json({ message: err.message });
};

module.exports = mdwGenericError;
