const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;
const HTTP_NOT_FOUND_STATUS = 400;
const PORT = '3000';

const {
  getAllData,
  getTalkerById,
  generateToken,
} = require('./helpers');

const { loginAuthentication } = require('./middlewares');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Rotas

app.get('/talker', async (_req, res) => {
  const allData = await getAllData();
  return res.status(HTTP_OK_STATUS).json(allData);
});

app.get('/talker/:id', async (req, res) => {
  const { params: { id } } = req;
  const talker = await getTalkerById(Number(id));
  if (!talker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', [
  loginAuthentication,
  (_req, res) => {
    const token = generateToken();
    return res.status(HTTP_OK_STATUS).json({ token });
  },
]);

// 

app.use((err, _req, res, _next) => {
  res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS).json({ message: err.message });
}); // middleware generic error

app.listen(PORT, () => {
  console.log('Online');
});
