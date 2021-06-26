const fs = require('fs').promises;

const talkersFile = './talker.json';

async function readFile() {
  try {
    const data = await fs.readFile(talkersFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

module.exports = readFile;
