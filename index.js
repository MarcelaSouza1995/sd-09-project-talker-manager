const express = require('express');
const bodyParser = require('body-parser');
const talkerMiddleware = require('./midlewares/talker');
const talkerIdMiddleware = require('./midlewares/talkerId');
const loginMiddleware = require('./midlewares/login');
const tokenValidation = require('./midlewares/tokenValidation');
const rateValidation = require('./midlewares/rateValidation');
const ageValidation = require('./midlewares/ageValidation');
const nameValidation = require('./midlewares/nameValidation');
const talkValidation = require('./midlewares/talkValidation');
const watchedAtValidation = require('./midlewares/watchedAtValidation');
const addPartcipant = require('./midlewares/addPartcipant');
const missEmailJson = require('./messagesJSON/missEmail.json');
const wrongEmailJson = require('./messagesJSON/wrongEmail.json');
const wrongPasswordJson = require('./messagesJSON/wrongPassword.json');
const missPasswordJson = require('./messagesJSON/missPassword.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talkerMiddleware, (req, res) => {
  res.status(200).send(JSON.parse(req.data));
});

app.get('/talker/:id', talkerIdMiddleware, (req, res) => {
  if (req.filter) {
    res.status(200).send(req.filter);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', loginMiddleware, (req, res) => {
  const { email, password } = req.body;
  const rgx = /\S+@\S+\.\S+/;
  if (!email) {
    res.status(400).send(missEmailJson);
  }
  if (!rgx.test(email)) {
    res.status(400).send(wrongEmailJson);
  }
  if (!password) {
    res.status(400).send(missPasswordJson);
  }
  if (password.length < 6) {
    res.status(400).send(wrongPasswordJson);
  }
  res.status(200).json({ token: req.token });
});

app.post('/talker', 
tokenValidation,
rateValidation,
nameValidation,
talkValidation,
watchedAtValidation,
ageValidation,
addPartcipant);

app.listen(PORT, () => {
  console.log('Online');
});
