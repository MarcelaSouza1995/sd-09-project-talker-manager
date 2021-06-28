const validateTalkWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;

  if (!talk || !talk.watchedAt) {
    return next(
      res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }),
    );
  }
  if (!regex.test(talk.watchedAt)) {
    return next(
      res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }),
    );
  }

  return next();
};

module.exports = validateTalkWatchedAt;
