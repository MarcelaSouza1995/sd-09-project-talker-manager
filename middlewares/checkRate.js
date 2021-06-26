const { errorMessage } = require('../services');

const checkRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) return res.status(400).json({ message: errorMessage.invalidRate });
  if (!rate) return res.status(400).json({ message: errorMessage.emptyTalk });
  next();
};

module.exports = checkRate;
