const fs = require('fs').promises;
const crypto = require('crypto');

const talkersPath = 'talker.json';

const getAllData = async () => {
  const content = await fs.readFile(talkersPath, 'utf8');
  const result = JSON.parse(content);
  return result;
};

const getTalkerById = async (id) => {
  const talkers = await getAllData();
  const chosenTalker = talkers.find((talker) => talker.id === id);
  return chosenTalker;
};

// https://stackoverflow.com/questions/38136222/generating-api-tokens-using-node-upper-and-lower-case-letters-and-numbers
// Achei essa forma de utilizar o crypto NodeJS para gerar um token como foi solicitado pelo requisito, no link acima.
const generateToken = () => crypto.randomBytes(16).toString('base64')
  .replace(/[^A-Za-z0-9]/g, '').substring(0, 16);

module.exports = {
  getAllData,
  getTalkerById,
  generateToken,
};
