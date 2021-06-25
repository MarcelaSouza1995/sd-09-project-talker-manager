const express = require('express');
const bodyParser = require('body-parser');
const { getTalker, generateToken } = require('./services/services');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// requisito 1
app.get('/talker', async (_request, response) => {
  const talker = await getTalker();
  if (talker.length === 0) {
    return response.status(HTTP_OK_STATUS).send([]);
  } 
    response.status(HTTP_OK_STATUS).json(talker);
});

// requisito 2
app.get('/talker/:id', async (request, response) => {
  const talker = await getTalker();
  const { id } = request.params;
  const filterId = talker.find((element) => element.id === parseInt(id, 10));
  if (!filterId) {
   return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(filterId);
});

// requisito 3

const emailValidator = (email, response) => {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const emailTester = emailRegex.test(email);
  if (!email || email.length === 0) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailTester) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const passwordValidator = (password, response) => {
  if (!password || password.length === 0) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

app.post('/login', (request, response) => {
  const { body: { email, password } } = request;
  emailValidator(email, response);
  passwordValidator(password, response);
  const token = generateToken();
  response.status(HTTP_OK_STATUS).json({ token });
  });

app.listen(PORT, () => {
  console.log('Online');
});
