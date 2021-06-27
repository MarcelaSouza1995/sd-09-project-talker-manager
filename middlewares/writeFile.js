const fs = require('fs').promises;
const { FileError } = require('../errors');

const talkersFile = 'talker.json';

module.exports = async (data) => {
  try {
    await fs.writeFile(talkersFile, JSON.stringify(data));
  } catch (err) {
    throw new FileError(talkersFile);
  }
};