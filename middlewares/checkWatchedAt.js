const { errorMessage } = require('../services');

const checkWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) res.status(400).json({ message: errorMessage.emptyTalk });
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  if (!dateRegex.test(watchedAt)) res.status(400).json({ message: errorMessage.invalidWatchedAt });
  next();
};

module.exports = checkWatchedAt;
