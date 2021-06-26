const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const {
  requisito1,
  requisito2,
  requisito3,
  requisito4,
  requisito5,
  requisito6,
  // requisito7,
} = require('./routes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', requisito1, requisito2, requisito4, requisito5, requisito6);
app.use('/login', requisito3);

app.listen(PORT, () => {
  console.log('Online');
});
