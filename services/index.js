const fs = require('fs').promises;

const talkerFile = async () => {
  const pathTalker = './talker.json';

  const data = await fs.readFile(pathTalker, 'utf8')
  .then((result) => JSON.parse(result))
  .catch((error) => console.log(error));

  return data;
};

module.exports = talkerFile;
