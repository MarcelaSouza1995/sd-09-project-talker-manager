const { errorMessage } = require('../services');

const checkRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate) return res.status(400).json({ message: errorMessage.emptyTalk });
  if (rate < 1 || rate > 5) return res.status(400).json({ message: errorMessage.invalidRate });
  next();
};

module.exports = checkRate;
