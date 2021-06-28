const { getFile } = require('../../services');

const file = 'talker.json';

const dataTalkerId = (req, _res, next) => {
  const { id: paramsId } = req.params;
  try {
    const data = getFile(file);
    req.talkerById = data.find((obj) => obj.id === +paramsId);
    next();
  } catch (err) {
    console.error(`Erro ao ler o arquivo! ${err}`);
  }
};

module.exports = dataTalkerId;
