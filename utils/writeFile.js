const fs = require('fs').promises;

const writeFileTalkers = async (file, object) => {
  const savedFile = await fs.writeFile(file, JSON.stringify(object), 'utf8');
  return savedFile;
};

module.exports = writeFileTalkers;
