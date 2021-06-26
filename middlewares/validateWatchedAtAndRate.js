const validateDate = require('validate-date');

const validateWatchedAtAndRate = (req, res, next) => {
  const { watchedAt, rate } = req.body;
  if (validateDate(watchedAt, responseType="boolean", dateFormat="dd/mm/yyyy")) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa' });
  }
  if (!typeof rate === 'number' || rate <= 1 || rate >= 5) {
  return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = validateWatchedAtAndRate;
