const verifyToken = (req, res, next) => {
  const TOKEN_NOT_FIND = 401;
  const TOKEN_SIZE = 16;
  const { authorization } = req.headers;
  
    if (!authorization) {
        return res.status(TOKEN_NOT_FIND)
        .json({ message: 'Token não encontrado' });
    }
  
  if (authorization.length !== TOKEN_SIZE) {
      return res.status(TOKEN_NOT_FIND)
      .json({ message: 'Token inválido' });
  }

  next();
};

module.exports = verifyToken;