// criar um endpoint que:
// Leia o arquivo talker.json
// retornar todos os palestrantes dessa leitura
const readGetTalkers = require('../functions/readFileAll');

const HTTP_OK_STATUS = 200;

module.exports = (_request, response) =>
  readGetTalkers().then((palestrantes) => response.status(HTTP_OK_STATUS).json(palestrantes))
  .catch((error) => response.status(HTTP_OK_STATUS).json(error));
