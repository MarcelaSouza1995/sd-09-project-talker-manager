// const fs = require('fs');
const { getFile } = require('../../services');

const file = 'talker.json';

const dataTalker = (req, _res, next) => {
  try {
    // req.data = fs.readFileSync('talker.json', 'utf8');
    req.data = getFile(file);
    console.log('dataTalker');
    next();
  } catch (err) {
    console.error(`Erro ao ler o arquivo! ${err}`);
  }
};

module.exports = dataTalker;
