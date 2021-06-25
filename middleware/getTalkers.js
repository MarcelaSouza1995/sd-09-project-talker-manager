const fs = require('fs').promises;

function getTalkers() {
  return fs.readFile('talker.json', 'utf8')
    .then((file) => JSON.parse(file));
}

module.exports = getTalkers;