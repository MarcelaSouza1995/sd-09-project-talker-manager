const TOKEN = { token: '7mqaVRXJSp886CGr' };

const tokenValidation = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (req.headers.token !== TOKEN.token) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = tokenValidation;
