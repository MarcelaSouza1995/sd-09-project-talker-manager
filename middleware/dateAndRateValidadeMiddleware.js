const talkWatchedAtValidateMiddleware = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.watchedAt) {
    return next({
      code: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!talk.watchedAt || !talk.rate) {
    return next({
      code: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

module.exports = talkWatchedAtValidateMiddleware;
