const validatorWatchedAtAndRate = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk
  const regexDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

  if (!regexDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = validatorWatchedAtAndRate;
