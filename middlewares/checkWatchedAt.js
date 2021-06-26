const { errorMessage } = require('../services');

const checkWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) return res.status(400).json({ message: errorMessage.emptyTalk });
  const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(watchedAt);
  if (!regex) return res.status(400).json({ message: errorMessage.invalidWatchedAt });
  next();
};

module.exports = checkWatchedAt;
