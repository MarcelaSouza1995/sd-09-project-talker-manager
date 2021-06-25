const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ code: 401, message: 'Token não encontrado' });

  if (token.length !== 16) return next({ code: 401, message: 'Token inválido' });

  next();
};

module.exports = tokenValidation;
