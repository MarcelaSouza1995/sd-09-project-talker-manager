// const { validateLogin, validateTalkerObject, addOneTalker } = require('../services/talkerService');

const mdwAddOneTalker = async (_req, _res, _next) => {
  // const { authorization } = req.headers;
  // const { name, age, talk } = req.body;
  // console.log(authorization);
  // console.log(name, age, talk);
  
  // return res.status(200).send('data');
  
  /* 
    --> até aqui, criado a rota (app.post('/talker',mdwAddOneTalker)....) <--
    -Continuar (abaixo)...
    -funções no topo da página a serem criadas na camada de serviços.
    -criar os serviços e funções de verificação
    -validateLogin => validar o token (chamar o middleware de criação de token e adicionar a memoria para validar o login).
    -validateTalkerObject => validar as keys e values do objeto que vem pelo body.
    -addOneTalker => após todas verificações, salvar o talker à lista.
    */
  // if (data.message) { return next(data); } se deu ruim manda o erro!! =D
};

module.exports = mdwAddOneTalker;