const fs = require('fs').promises;

const writeFiles = async (file, content) => {
  const response = await fs.writeFile(file, JSON.stringify(content));
  return response;
};

module.exports = writeFiles;