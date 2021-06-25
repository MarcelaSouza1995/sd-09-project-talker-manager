function validateToken(req, res, next) {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const regex = /^[a-zA-Z0-9_]*$/;
  const regexTest = regex.test(token);

  if (!regexTest) {
    return res.status(401).json({ message: 'Token Invalido' });
  }

  next();
}

module.exports = validateToken;
