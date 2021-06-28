const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('token');
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length < 16) return res.status(401).json({ message: 'Token inválido' });
  console.log('token next');
  next();
};

module.exports = validateToken;
