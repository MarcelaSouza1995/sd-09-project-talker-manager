const fs = require('fs');

const validaNome = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const validaIdade = (req, res) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const validaCamposTalker = (req, res) => {
  const { watchedAt, rate } = req.body.talk;
  const validaDataRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!validaDataRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (Number(rate) > 5 || Number(rate) < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return false;
};

const validaTalker = (req, res) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  } 

  return validaCamposTalker(req, res);
};

const readFilePromise = () => new Promise((resolve, reject) => {
  fs.readFile('./talker.json', 'utf8', (err, content) => {
    if (err) return reject(err);
    return resolve(content);
  });
});

const addTalker = (req, res) => {
  const { name, age, talk } = req.body;
  readFilePromise()
  .then((response) => {
    const allTalkers = JSON.parse(response);
    const talker = { name, age, talk, id: allTalkers.length + 1 };
    allTalkers.push(talker);
    fs.writeFile('./talker.json', JSON.stringify(allTalkers))
    .then(() => res.status(201).json(talker));
  })
  .catch((erro) => res.status(500).json({ message: `Erro interno: ${erro}` }));
};

const middlewareInsertTalker = (req, res) => {
  if (validaNome(req, res)) return;
  if (validaIdade(req, res)) return;
  if (validaTalker(req, res)) return;

  return addTalker(req, res);
};

module.exports = middlewareInsertTalker;