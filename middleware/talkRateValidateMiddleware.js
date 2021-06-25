const watchedAtRegex = /\d{2}\/\d{2}\/\d{4}/;
const talkRateValidateMiddleware = (req, res, next) => {
  const { talk } = req.body;
  const teste = watchedAtRegex.test(talk.watchedAt);
  if (!teste) {
    return next({ code: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(talk.rate)) {
    return next({ code: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (talk.rate < 1 && talk.rate < 5) {
    return next({ code: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  res.end();
};

module.exports = talkRateValidateMiddleware;