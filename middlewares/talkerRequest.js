const fs = require('fs');
const util = require('util');

const readdirPromisified = util.promisify(fs.readFile);
function readTalkerJson(req, res) {
  readdirPromisified('./talke.json')
  .then((files) => JSON.parse(files))
  .then((response) => res.status(200).json(response))
  .catch(() => {
    res.status(200).send([]);
});
}

module.exports = readTalkerJson;