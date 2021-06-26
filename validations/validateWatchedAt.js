const validateWatchedAt = (req, res, next) => {
  const dataValidate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  const { talk: { watchedAt } } = req.body;

  if (watchedAt === undefined) {
    return next(res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
));
  }

  if (!dataValidate.test(watchedAt)) {
    return next(res.status(400).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
));
  }
  return next();
};

module.exports = validateWatchedAt;