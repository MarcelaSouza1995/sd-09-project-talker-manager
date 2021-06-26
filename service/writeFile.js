const fs = require('fs').promises;

const talkersFile = './talker.json';

async function writeFile(data) {
  try {
    await fs.writeFile(talkersFile, JSON.stringify(data));
  } catch (err) {
    return err;
  }
}

module.exports = writeFile;
