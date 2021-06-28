const fs = require('fs').promises;

const talkerFile = 'talker.json';

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;

function readTalker() {
  const talkers = fs.readFile(talkerFile, 'utf8')
    .then((result) => JSON.parse(result));

  return talkers;
}

const getTalker = ((req, res, _next) => {
  const { params } = req;
  const { id } = params;
  let status = HTTP_OK_STATUS;
  readTalker()
    .then((data) => {
      if (id === undefined) {
        return res.status(status).json(data);
      }
      let returnValue;
      returnValue = data.find((talker) => talker.id === parseInt(id, 10));
      if (returnValue === undefined) {
        returnValue = { message: 'Pessoa palestrante não encontrada' };
        status = HTTP_NOTFOUND_STATUS;
      }
      return res.status(status).json(returnValue);
    });
});

module.exports = getTalker;
