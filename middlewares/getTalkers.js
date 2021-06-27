const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

module.exports = (_request, response, _next) => {
  fs.readFile('./talker.json', 'utf-8')
  .then((fileTalker) => JSON.parse(fileTalker))
    .then((res) => response.status(HTTP_OK_STATUS).json(res))
      .catch(() => response.status(HTTP_OK_STATUS).json([])); 
};