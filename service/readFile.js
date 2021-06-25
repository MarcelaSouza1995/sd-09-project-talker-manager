const fs = require('fs').promises;

const talkerFile = './talker.json';

async function readFile() {
  try {
    const data = await fs.readFile(talkerFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

module.exports = readFile;
