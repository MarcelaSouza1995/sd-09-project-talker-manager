const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const randonToken = (n) => {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];
  for (let i = 0; i < n; i += 1) {
    const j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
};

// adaptado de https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/ 

const { validation } = require('./loginValidation');

const { tokenValidation,
  nameAgeValidation,
  talkObjValidation,
  talkComponentsValidation } = require('./addTalkerValidation');

const writeTalkers = (json, writeFile) => fs.writeFileSync(json, JSON.stringify(writeFile));
// https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options
const getTalkers = () => JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
// https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// req 1:
app.get('/talker', async (_req, res) => {
  try {
    const talkers = await getTalkers();
    return res.status(HTTP_OK_STATUS).send(talkers);
    // retorna o status 200 com o conteudo de talkers.json
  } catch (error) {
    return res.status(HTTP_OK_STATUS).send([]);
    // caso não encontre ninguém, retorna o status 200 com um array vazio.
  }
});

// Req 2

app.get('/talker/:id', async (req, res) => {
  try {
    const idParams = Number(req.params.id);
    // encontra o id no link e transforma em numero
    const palestrant = await getTalkers().find((element) => element.id === idParams);
    // verifica se o id encontrado é existente dentro de talker.json
    if (!palestrant) {
      return res.status(404).send({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    // envia o status 404 caso o palestrante não seja encontrado
    res.status(HTTP_OK_STATUS).send(palestrant);
    // encontrando o palestrante, envia seus detalhes no formato JSON pelo status 200
  } catch (error) {
    return res.status(500).send({ error });
  }
  // catch é boa pratica, não relacionada diretamente ao requisito.
});

// req 3

app.post('/login',
  validation,
  (_req, res) => {
    try {
      const token = randonToken(16);
      return res.status(HTTP_OK_STATUS).send({ token });
    } catch (error) {
      return res.status(500).send({ error });
    }
  });

// Em computação, POST é um dos muitos métodos de requisição suportados pelo protocolo HTTP 
// usado na World Wide Web. ... Ele é normalmente usado quando se faz o upload de um arquivo 
// ou envia-se um formulário web completo. Em contraste o método de requisição GET do HTTP foi 
// projetado para recuperar informações do servidor.
// https://pt.wikipedia.org/wiki/POST_(HTTP)#:~:text=Em%20computa%C3%A7%C3%A3o%2C%20POST%20%C3%A9%20um,usado%20na%20World%20Wide%20Web.&text=Ele%20%C3%A9%20normalmente%20usado%20quando,para%20recuperar%20informa%C3%A7%C3%B5es%20do%20servidor.

//  req 4 
app.post('/talker',
  tokenValidation,
  nameAgeValidation,
  talkObjValidation,
  talkComponentsValidation,
  // Caso esteja tudo certo, retorne o status 201 e a pessoa cadastrada.
  // O endpoint deve retornar o status 201 e a pessoa palestrante que foi cadastrada, da seguinte forma: { "id": 1, "name": "Danielle Santos", "age": 56, "talk": { "watchedAt": "22/10/2019", "rate": 4 } }
  (async (req, res) => {
    try {
      const allTalkers = await getTalkers();
      const newTalker = req.body;
      newTalker.id = allTalkers.length + 1;
      allTalkers.push(newTalker);
      writeTalkers('./talker.json', allTalkers);
      return res.status(201).send(newTalker);
    } catch (error) {
      return res.status(201).send({ error });
    }
  }));

  // req 5

  app.put('/talker/:id',
  tokenValidation,
  nameAgeValidation,
  talkObjValidation,
  talkComponentsValidation, async (req, res) => {
    try {
      const idToChange = Number(req.params.id);
      const talkers = await getTalkers();
      const palestrant = await getTalkers().find((element) => element.id === idToChange);
      const changed = req.body;
      let indexOfPalestrant = 'x';
      for (let i = 0; i < talkers.length; i += 1) {
        if (talkers[i].id === palestrant.id) {
          indexOfPalestrant = i;
        }
      }
      changed.id = talkers.length;
      talkers.splice(indexOfPalestrant, 1, changed);
      writeTalkers('./talker.json', talkers);
      return res.status(200).send(changed);
    } catch (error) {
      return res.status(500).send({ error });
    }
  });

//  consultei o repositório de meu colega João Castaldi 
//  https://github.com/tryber/sd-08-project-talker-manager/pull/34/files#diff-256422c877a0031a44f2168c442cddace08df1226b1e4ec5f529a0f869ea5b8aR19
