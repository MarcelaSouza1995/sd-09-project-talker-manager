const talkRatePutMiddleware = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5) {
    return next({ code: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!talk.rate) {
    return next({
      code: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  
  if (!Number.isInteger(talk.rate)) {
    return next({ code: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  return next();
};

module.exports = talkRatePutMiddleware;