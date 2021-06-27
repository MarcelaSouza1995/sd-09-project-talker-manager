const messageError = {
  talkNotFound: 'Pessoa palestrante não encontrada',
  tokenNotFound: 'Token não encontrado',
  emailRequerid: 'O campo "email" é obrigatório',
  passwordRequerid: 'O campo "password" é obrigatório',
  nameRequerid: 'O campo "name" é obrigatório',
  ageRequerid: 'O campo "age" é obrigatório',
  talkRequerid: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  watchedAtRequerid: 'O campo "watchedAt" é obrigatório',
  rateRequerid: 'O campo "rate" é obrigatório',
  tokenInvalid: 'Token inválido',
  nameInvalid: 'O "name" deve ter pelo menos 3 caracteres',
  ageInvalid: 'A pessoa palestrante deve ser maior de idade',
  watchedAtInvalid: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  rateInvalid: 'O campo "rate" deve ser um inteiro de 1 à 5',
  emailInvalid: 'O "email" deve ter o formato "email@email.com"',
  passwordInvalid: 'O "password" deve ter pelo menos 6 caracteres',

};

module.exports = messageError;