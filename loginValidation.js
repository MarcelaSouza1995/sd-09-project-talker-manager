const responses = [
    {
      message: 'O campo "email" é obrigatório',
    },
    {
      message: 'O "email" deve ter o formato "email@email.com"',
    },
    {
      message: 'O campo "password" é obrigatório',
    },
    {
      message: 'O "password" deve ter pelo menos 6 caracteres',
    },
  ];

const validation = (req, res, next) => {
    const { body } = req;
    const { email, password } = body;
    const EMAIL_VALIDATION = /\S+@\S+\.\S+/; // fonte: https://regexr.com/3e48o
    // Caso o campo não seja passado ou esteja vazio retorne um código de status 400, 
    // com o seguinte corpo: { "message": "O campo \"email\" é obrigatório" }
    if (!email) return res.status(400).send(responses[0]);
    // Caso o email passado não seja um email válido retorne um código de status 400,
    // com o seguinte corpo: { "message": "O \"email\" deve ter o formato \"email@email.com\"" }
    if (!EMAIL_VALIDATION.test(email)) return res.status(400).send(responses[1]); 
    // O campo password deverá ter pelo menos 6 caracteres.
    // Caso o campo não seja passado ou esteja vazio retorne um código de status 400, 
    // com o seguinte corpo: { "message": "O campo \"password\" é obrigatório" }
    if (!password) return res.status(400).send(responses[2]);
    // Caso a senha não tenha pelo menos 6 caracteres retorne um código de status 400,
    // com o seguinte corpo: { "message": "O \"password\" deve ter pelo menos 6 caracteres" }
    if (password.length < 6) return res.status(400).send(responses[3]);
    next();
  };

  module.exports = { validation };

  // consultei o repositório de meu colega João Castaldi
  // https://github.com/tryber/sd-08-project-talker-manager/pull/34/files#diff-256422c877a0031a44f2168c442cddace08df1226b1e4ec5f529a0f869ea5b8aR19