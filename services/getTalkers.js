const fs = require('fs').promises;
const { TALKERS_FILE, DECODE } = require('../config');

async function getTalkers() {
  return fs.readFile(TALKERS_FILE, DECODE)
    .then((data) => JSON.parse(data))
    .catch((err) => err);
}

module.exports = getTalkers;
