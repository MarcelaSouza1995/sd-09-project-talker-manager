const fs = require('fs').promises;

const talkerFile = 'talker.json';

const HTTP_OK_STATUS = 200;

function readTalker() {
  const talkers = fs.readFile(talkerFile, 'utf8')
    .then((result) => JSON.parse(result));

  return talkers;
}

const getTalker = ((_req, res, _next) => {
  readTalker()
    .then((data) => res.status(HTTP_OK_STATUS).json(data));
});

module.exports = getTalker;

// res.status(HTTP_OK_STATUS).json(data)