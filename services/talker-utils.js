const fs = require('fs').promises;

module.exports = async () => {
  const fileContent = await fs.readFile('./talker.json');

  return JSON.parse(fileContent);
};
