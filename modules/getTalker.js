const fs = require('fs');

const result = function getTalkerById(id) {
  const data = fs.readFileSync('talker.json', 'utf-8');

  const talker = JSON.parse(data).find((i) => i.id === parseInt(id, 10));

  return talker;
};

module.exports = result;
