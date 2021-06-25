const fs = require('fs/promises');
// const rescue = require('express-rescue');

// const getTalkers = rescue(async (_req, res, _next) => {
//   const file = await fs.readFile('./talker.json');
//   res.status(200).send(file.toString('utf-8'));
// });

const getTalkers = async (_req, res, next) => {
  try {
    const file = await fs.readFile('./talker.json');
    if (file.length === 0) {
      return res.status(200).json('[]');
    }
    return res.status(200).send(file.toString('utf-8'));
  } catch (error) {
    return next({ code: 404, message: 'Erro na requisicao' });
  }
};

module.exports = getTalkers;