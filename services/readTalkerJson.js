const fs = require('fs').promises;

const getTalkers = async (next) => {
  try {
    return JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  } catch (error) {
    return next({ message: error.message });
  }
};

module.exports = getTalkers;