const fs = require('fs');
const { FileError } = require('../errors');

const talkersFile = 'talker.json';

module.exports = () => {
  try {
    const talkersData = fs.readFileSync(talkersFile, 'utf8');
    if (talkersData.length > 0) {
      return (JSON.parse(talkersData));
    }
      return ([]);
  } catch (err) {
    throw new FileError(talkersFile);
  }
};