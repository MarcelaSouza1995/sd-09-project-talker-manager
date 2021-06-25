const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const { getTalkers, findTalkerById } = require('./services/talker');
const { validateFields } = require('./services/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST_STATUS = 400;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

//

app.get('/talker', async (_request, response) => {
  try {
    const talkers = await getTalkers();
    response.status(HTTP_OK_STATUS).json(talkers);
  } catch (err) {
    response.status(HTTP_OK_STATUS).json([]);
  }
});

app.get('/talker/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const talker = await findTalkerById(id);
    response.status(HTTP_OK_STATUS).json(talker);
  } catch (err) {
    response.status(HTTP_NOT_FOUND_STATUS).json({ message: err.message });
  }
});

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  try {
    validateFields(email, password);
    const token = crypto.randomBytes(8).toString('hex');
    response.status(HTTP_OK_STATUS).json({ token });
  } catch (err) {
    response.status(HTTP_BAD_REQUEST_STATUS).json({ message: err.message });
  }
});
