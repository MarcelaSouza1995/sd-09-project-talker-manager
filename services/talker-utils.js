const fs = require('fs').promises;

const getTalkers = async () => {
  const fileContent = await fs.readFile('./talker.json', 'utf-8');

  return JSON.parse(fileContent);
};

const setTalkers = async (newContent) => {
  await fs.writeFile('./talker.json', JSON.stringify(newContent));
};

module.exports = {
  getTalkers,
  setTalkers,
};
