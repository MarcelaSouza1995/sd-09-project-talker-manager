const fs = require('fs').promises;
const crypto = require('crypto');

const getTalker = async () => {
  try {
    const response = await fs.readFile('./talker.json');
    return JSON.parse(response);
  } catch (error) {
    console.log(error);
  }
};

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = { getTalker, generateToken };
