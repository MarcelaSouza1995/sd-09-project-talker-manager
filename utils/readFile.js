const fs = require('fs');

const readFile = (file) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
};

module.exports = readFile;
