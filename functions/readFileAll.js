const fs = require('fs').promises;

function readGetTalkers() {
  const palestrantes = fs
  .readFile('./talker.json', 'utf-8')
  .then((result) => JSON.parse(result)).catch((_error) => []);
  return palestrantes;
}

module.exports = readGetTalkers;
