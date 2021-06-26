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

const newTalker = async (talker) => {
  try {
    const response = await fs.readFile('./talker.json');
    const object = {
      id: JSON.parse(response).length + 1,
      ...talker,
    };
    return object;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getTalker, generateToken, newTalker };
