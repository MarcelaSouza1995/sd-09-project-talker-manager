const fs = require('fs').promises;
const rescue = require('express-rescue');

// const validateToken = (token, res) => {
//   if (!token) return res.status(401).json({ message: 'Token não encontrado' });
//   if (token.length < 16) return res.status(401).json({ message: 'Token inválido' });
// };

// const validateName = (name, res) => {
//   if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
//   if (name.length < 3) {
//     return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
//   }
// };

// const validateAge = (age, res) => {
//   if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

//   if (typeof (age) !== 'number' && age < 18) {
//     return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
//   }
// };

// const validateDateAndRate = (talk, res) => {
//   const { watchedAt, rate } = talk;
//   const validateDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
//   if (!validateDate.test(watchedAt)) {
//     return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
//   }

//   if (typeof (rate) !== 'number' || rate < 1 || rate > 5) {
//     return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
//   }
// };

// const validateTalk = (talk, res) => {
//   if (!talk.watchedAt || !talk.rate) {
//     return res.status(400)
//       .json({
//         message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
//       });
//   }
//   return validateDateAndRate(talk, res);
// };

const createTalker = rescue(async (req, res) => {
  // const { token } = req.headers;
  // validateToken(token, res);

  const { name, age, talk } = req.body;
  // validateName(name, res);
  // validateAge(age, res);
  // validateTalk(talk, res);

  const buffTalkers = await fs.readFile('./talker.json');
  const talkers = JSON.parse(buffTalkers.toString('utf-8'));
  const id = talkers.length + 1;
  console.log(id);
  talkers.push({ id, name, age, talk });
  await fs.writeFile('./talker.json', JSON.stringify(talkers))
    .then(() => res.status(201).json({ id, name, age, talk }));
});

module.exports = createTalker;
