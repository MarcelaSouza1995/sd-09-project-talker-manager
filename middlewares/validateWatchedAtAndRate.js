const validateWatchedAtAndRate = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  const dateFormat = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!dateFormat.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!typeof rate === 'number' || rate < 1 || rate > 5) {
  return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = validateWatchedAtAndRate;
