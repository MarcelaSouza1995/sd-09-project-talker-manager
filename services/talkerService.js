const fs = require('fs').promises;
const { tokenList } = require('../data/data');

async function getAllTalkers() {
  try {
    const data = await fs.readFile('./talker.json');
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

async function getOneTalker(idNumber) {
  try {
    const data = await getAllTalkers();
    if (data.message) { return data; }
    const oneTalkerData = data.find((talker) => talker.id === idNumber);
    if (!oneTalkerData) throw new Error('Pessoa palestrante não encontrada');
    return oneTalkerData;
  } catch (error) {
    return { status: 404, message: error.message };
  }
}

function verifyAuthToken(req) {
  try {
    const { authorization } = req.headers;
    const findTokenData = tokenList.find((token) => token === authorization);
    if (authorization.length !== 16) { throw new Error('Token inválido'); }
    if (!findTokenData) { throw new Error('Token não encontrado'); }
  } catch (error) {
    return { status: 401, message: error.message };
  }
}

function verifyname(name) {
  if (!name) { return new Error('O campo "name" é obrigatório'); }
  if (name.length < 3) { return new Error('O "name" deve ter pelo menos 3 caracteres'); }
}

function verifyAge(age) {
  const ageNumber = Number(age);
  if (!ageNumber) { return new Error('O campo "age" é obrigatório'); }
  if (ageNumber < 18) { return new Error('A pessoa palestrante deve ser maior de idade'); }
}

function verifyTalkObj(watchedAt, rate) {
  // formula regex obtida/editada; ref:"https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript"
  const rateNumber = Number(rate);
  const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;
  if (!(dateRegex.test(watchedAt))) {
    return new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
  if (rateNumber < 1 || rateNumber > 5) {
    return new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

function verifyTalk(talk) {
  const { watchedAt, rate } = talk;
  if (watchedAt && rate) {
    const invalidObj = verifyTalkObj(watchedAt, rate);
    return invalidObj;
  }
  return new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios');
}

function validateTalkerObj(req) {
  try {
    const { age, name, talk } = req.body;
    if (verifyname(name)) { return verifyname(name); }
    if (verifyAge(age)) { return verifyAge(age); }
    if (verifyTalk(talk)) { return verifyTalk(talk); }
  } catch (error) {
    return { status: 400, message: error.message };
  }
}

async function saveOneTalker(req) {
  try {
    const data = await fs.readFile('./talker.json');
    const parsedData = JSON.parse(data);

    const { age, name, talk } = req.body;
    const id = parsedData.length + 1;
    const talkerObject = { id, name, age, talk };
    parsedData.push(talkerObject);

    fs.writeFile('./talker.json', JSON.stringify(parsedData));
    return talkerObject;
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

module.exports = { getAllTalkers, getOneTalker, verifyAuthToken, validateTalkerObj, saveOneTalker };
