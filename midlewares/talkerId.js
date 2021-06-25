const fs = require('fs');

const file = 'talker.json';

const talkerIdMiddleware = (req, res, next) => {
  const { id } = req.params;
  try {
    const data = fs.readFileSync(file, 'utf8');
    const teste = JSON.parse(data);
    req.filter = teste.find(e => e.id === (+id));
    next();
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
};

module.exports = talkerIdMiddleware;
