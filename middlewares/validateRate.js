const { errorMessage } = require('../services');

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate) res.status(400).json({ message: errorMessage.emptyTalk });
  if (rate < 1 || rate > 5) res.status(400).json({ message: errorMessage.invalidRate });
  next();
};

module.exports = validateRate;
