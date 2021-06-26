const fs = require('fs');

const dataTalker = (req, _res, next) => {
  try {
    req.data = fs.readFileSync('talker.json', 'utf8');
    console.log('dataTalker');
    next();
  } catch (err) {
    console.error(`Erro ao ler o arquivo! ${err}`);
  }
};

module.exports = dataTalker;
