const express = require('express');
const bodyParser = require('body-parser');
const { getPrincipal, getTalkers } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', getPrincipal);

app.get('/talker', getTalkers);

app.listen(PORT, () => {
  console.log('Online');
});
