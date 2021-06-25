const mdwGenericError = (err, _req, res, _next) => {
  console.log('i got and error');
  const errorStatus = err.code || 500;
  return res.status(errorStatus).json(err);
};

module.exports = mdwGenericError;
