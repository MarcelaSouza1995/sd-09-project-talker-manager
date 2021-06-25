const fs = require('fs').promises;
const emailValidator = require('email-validator');

async function getAllTalkers() {
  try {
    const data = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    const errorObj = {
      status: error.status || 500,
      message: error.message,
    };
    return errorObj;
  }
}

async function getTalkerById(id) {
  try {
    const data = await getAllTalkers();
    const talkerData = data.find((talker) => talker.id === Number(id));
    if (!talkerData) throw new Error();
      return talkerData;
  } catch (error) {
    const errorObj = {
      status: 404,
      message: 'Pessoa palestrante não encontrada',
    };
    return errorObj;
  }
}

function checkEmailAndPassword(email, password) {
  const PWRD_LENGTH = 6;
  if (!email) {
    return { status: 400, message: 'O campo "email" é obrigatório' };
  }
  if (!password) {
    return { status: 400, message: 'O campo "password" é obrigatório' };
  }
  if (emailValidator.validate(email) !== true) {
    return { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
  }
  if (password.length < PWRD_LENGTH) {
    return { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return true;
}

module.exports = {
  getAllTalkers,
  getTalkerById,
  checkEmailAndPassword,
};
