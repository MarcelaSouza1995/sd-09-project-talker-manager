const fs = require('fs').promises;

const talker = './talker.json';
const readFile = async () => {
  const talkersData = await fs.readFile(talker, 'utf-8', (err, data) => {
    if (err) throw err;
    return data;
  });
  return JSON.parse(talkersData);
};

const getData = async () => {
  const talkersData = await readFile();
  if (!talkersData.length) throw new Error('Nenhum palestrante encontrado');
  return talkersData;
};

module.exports = { getData };