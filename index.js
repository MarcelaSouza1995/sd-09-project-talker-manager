const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { getTalker, generateToken, newTalker } = require('./services/services');
const {
  emailValidator,
  passwordValidator,
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator } = require('./services/validators');

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
app.post('/login', (request, response) => {
  const { body: { email, password } } = request;
  emailValidator(email, response);
  passwordValidator(password, response);
  const token = generateToken();
  response.status(HTTP_OK_STATUS).json({ token });
  });

// requisito 4
app.post('/talker',
tokenValidator,
nameValidator,
ageValidator,
talkValidator,
watchedAtValidator,
rateValidator,
async (request, response) => {
  const talkers = await getTalker();
  const talkerGenerator = await newTalker(request.body);
  talkers.push(talkerGenerator);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  response.status(201).json({ ...talkerGenerator });  
});

app.listen(PORT, () => {
  console.log('Online');
});
