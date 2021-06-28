const { getAllTalkers } = require('../funcoes/readFileTalkers');

const HTTP_OK_STATUS = 200;

module.exports = (_request, response, _next) => 
   getAllTalkers().then((talkers) => 
    response.status(HTTP_OK_STATUS).json(talkers))
    .catch((err) => response.status(HTTP_OK_STATUS).json(err));
