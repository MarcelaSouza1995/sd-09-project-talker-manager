const fs = require('fs').promises;

function readTalkerJson(req, res) {
  fs.readFile('./talker.json')
  .then((files) => JSON.parse(files))
  .then((response) => res.status(200).json(response))
  .catch(() => {
    res.status(200).send([]);
  });
}

module.exports = readTalkerJson;