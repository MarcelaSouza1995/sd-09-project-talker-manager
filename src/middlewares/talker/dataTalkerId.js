const fs = require('fs');

const dataTalkerId = (req, _res, next) => {
  const { id: paramsId } = req.params;
  // console.log('dataTalkerId id ', typeof +paramsId)
  try {
    const data = fs.readFileSync('talker.json', 'utf8');
    const dataJson = JSON.parse(data);
    req.talkerById = dataJson.find((obj) => obj.id === +paramsId);
    next();
  } catch (err) {
    console.error(`Erro ao ler o arquivo! ${err}`);
  }
};

module.exports = dataTalkerId;
