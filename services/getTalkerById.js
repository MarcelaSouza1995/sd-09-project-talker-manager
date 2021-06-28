const fs = require('fs').promises;
const { TALKERS_FILE, DECODE } = require('../config');

async function getTalkerById(talkerId) {
  return fs.readFile(TALKERS_FILE, DECODE)
    .then((data) => JSON.parse(data).find(({ id }) => Number(id) === talkerId))
    .catch((err) => err);
}

module.exports = getTalkerById;
