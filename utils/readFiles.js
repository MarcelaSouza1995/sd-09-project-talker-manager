const fs = require('fs');

const file = 'talker.json';

const readFiles = () => {
  try {
    const response = fs.readFileSync(file, 'utf8');
    const result = JSON.parse(response);
    return result;
   } catch (error) {
    return error;
   }
};

module.exports = readFiles;