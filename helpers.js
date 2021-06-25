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

const registerNewTalker = async (talker) => {
  const newTalker = talker;
  const allTalkers = await getAllData();
  newTalker.id = allTalkers[allTalkers.length - 1].id + 1;
  const newList = [...allTalkers, newTalker];
  await fs.writeFile(talkersPath, JSON.stringify(newList));
  return newTalker;
};

const editTalker = async (id, newInfos) => {
  const allTalkers = await getAllData();
  const talkerUpdated = newInfos;
  talkerUpdated.id = id;
  const updatedList = allTalkers.reduce((acc, talker) => {
    if (talker.id === id) return [...acc, talkerUpdated];
    return [...acc, talker];
  }, []);
  // console.log(updateList);
  await fs.writeFile(talkersPath, JSON.stringify(updatedList));
  return talkerUpdated;
};

const deleteTalker = async (id) => {
  const allTalkers = await getAllData();
  const newList = allTalkers.filter((talker) => talker.id !== id);
  await fs.writeFile(talkersPath, JSON.stringify(newList));
};

module.exports = {
  getAllData,
  getTalkerById,
  generateToken,
  registerNewTalker,
  editTalker,
  deleteTalker,
};
