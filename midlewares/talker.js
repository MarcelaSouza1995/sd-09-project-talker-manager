const fs = require('fs');
const file = '/home/tiago/tprojetos/projetosAvaliadores/sd-09-project-talker-manager/talker.json';

const talkerMiddleware = (req, res, next) => {
  try {
    req.data = fs.readFileSync(file, 'utf8');
    next();
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
};

module.exports = talkerMiddleware;
