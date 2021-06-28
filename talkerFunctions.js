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

const getTalkerById = async (id) => {
  const talkersData = await getData();
  const desiredTalker = talkersData.find((person) => person.id === Number(id));
  if (!desiredTalker) throw new Error('Pessoa palestrante não encontrada');
  return desiredTalker;
};

const validateLogin = (email, password) => {
  if (!email) throw new Error('O campo "email" é obrigatório');
  if (!password) throw new Error('O campo "password" é obrigatório');
  if (!email.match(/[^@]+@[^.]+\.com/g)) { 
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
  if (!password.length >= 6) throw new Error('O "password" deve ter pelo menos 6 caracteres');
};

module.exports = { getData, getTalkerById, validateLogin };