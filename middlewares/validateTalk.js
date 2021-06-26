const { errorMessage } = require('../services');

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) res.status(400).json({ message: errorMessage.emptyTalk });
  next();
};

module.exports = validateTalk;
