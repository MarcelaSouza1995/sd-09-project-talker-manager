const tokenValidation = (req, res, next) => {
  const { token } = req.headers;
  
  if (token && token.length !== 16) res.status(401).json({ message: 'Token inválido' });

  if (!token) res.status(401).json({ message: 'Token não encontrado' });

  next();
};

module.exports = tokenValidation;