const fs = require('fs/promises');

const getTalker = async () => {
  try {
    const response = await fs.readFile('./talker.json');
    return JSON.parse(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getTalker;
