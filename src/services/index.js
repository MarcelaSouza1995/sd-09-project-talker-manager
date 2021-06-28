const fs = require('fs');

const getFile = (file) => {
  const dataTalker = fs.readFileSync(file, 'utf8');
  return JSON.parse(dataTalker);
};

module.exports = {
  getFile,
};
