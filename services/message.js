const message = {
  talkerNotFound: 'Pessoa palestrante não encontrada',
  emptyEmail: 'O campo "email" é obrigatório',
  invalidEmail: 'O "email" deve ter o formato "email@email.com"',
  emptyPassword: 'O campo "password" é obrigatório',
  invalidPassword: 'O "password" deve ter pelo menos 6 caracteres',
  tokenNotFound: 'Token não encontrado',
  invalidToken: 'Token inválido',
  emptyName: 'O campo "name" é obrigatório',
  invalidName: 'O "name" deve ter pelo menos 3 caracteres',
  emptyAge: 'O campo "age" é obrigatório',
  invalidAge: 'A pessoa palestrante deve ser maior de idade',
  invalidWatchedAt: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  invalidRate: 'O campo "rate" deve ser um inteiro de 1 à 5',
  emptyTalk: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  deleteTalker: 'Pessoa palestrante deletada com sucesso',
};

module.exports = message;
