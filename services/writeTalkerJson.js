const fs = require('fs').promises;

const writeTalkerJson = async (element, next) => {
  try {
    await fs.writeFile('./talker.json', JSON.stringify(element, null, 2));
  } catch (error) {
    next({ message: error.message, status: 500 });
  }
};

module.exports = writeTalkerJson;
