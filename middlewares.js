const fs = require('fs').promises;

const getTalkers = async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));
  res.status(200).send(talkers);
};

const getTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));
  const talker = talkers.find((tal) => tal.id === +id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const login = (req, res) => {
  const generateToken = (length) => {
    let stringAleatoria = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i += 1) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
  };
  const token = generateToken(16);
  res.status(200).json({ token });
};

module.exports = { getTalkers, getTalker, validateEmail, validatePassword, login };