const crypto = require('crypto');

const talkerIdMiddleware = (req, res, next) => {
  try {
    req.token = crypto.randomBytes(8).toString('hex');
    next();
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
};

module.exports = talkerIdMiddleware;
