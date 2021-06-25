const fs = require('fs');

const result = function returnTalkerList() {
  const data = fs.readFileSync('./talker.json', 'utf-8');
  if (!data) {
    return [];
  }
  return data;
};

module.exports = result;
