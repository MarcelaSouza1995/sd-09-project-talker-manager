const express = require('express');
const bodyParser = require('body-parser');
const { getMain, getTalkers } = require('./middlewares');
 
const PORT = '3000';
const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', getMain);
app.get('/talker', getTalkers);

app.listen(PORT, () => {
  console.log('Online');
});