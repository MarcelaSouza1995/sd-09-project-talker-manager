const express = require('express');
const bodyParser = require('body-parser');
const { getMain, getTalkers, getTalkerById, error } = require('./middlewares');
 
const PORT = '3000';
const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', getMain);
app.get('/talker/:id', getTalkerById);
app.get('/talker/', getTalkerById, getTalkers);

app.use(error);
app.listen(PORT, () => {
  console.log('Online');
});