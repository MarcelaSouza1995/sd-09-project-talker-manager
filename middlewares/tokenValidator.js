const tokenValidator = (req, _res, next) => {
  const { token } = req.headers;
  if (!token) {
    return next({ code: 401, message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return next({ code: 401, message: 'Token inválido' });
  }
  return next();
};

module.exports = tokenValidator;