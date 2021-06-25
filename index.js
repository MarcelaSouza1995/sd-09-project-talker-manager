// Tiago Yoneda <xyonedax@gmail.com>
const express = require('express');
const bodyParser = require('body-parser');
const talkerRoute = require('./routes/takerRoute');
const middleWares = require('./middleWares/index');
const auxiliarFunctions = require('./auxiliarFunctions/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/talker', talkerRoute);

app.post('/login', middleWares.validateLogin, (_req, res) => {
  res.status(200).json({
    token: `${auxiliarFunctions.generateToken()}`,
  });
});
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
