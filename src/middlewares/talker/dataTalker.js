const fs = require('fs');

const talkerMiddleware = (req, _res, next) => {
  try {
    req.data = fs.readFileSync('talker.json', 'utf8');
    next();
  } catch (err) {
    console.error(`Erro ao ler o arquivo! ${err}`);
  }
};

module.exports = talkerMiddleware;
