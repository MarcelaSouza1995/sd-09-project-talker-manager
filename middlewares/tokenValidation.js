const tokenLength = 16;

const tokenValidation = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (req.headers.authorization.length < tokenLength) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};
  
module.exports = tokenValidation;