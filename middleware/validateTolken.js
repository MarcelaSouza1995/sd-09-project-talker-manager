function validateToken(req, res, next) {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const regex = /^[a-zA-Z0-9]*$/;
  const regexTest = regex.test(authorization);

  if (!regexTest || authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
}

module.exports = validateToken;
