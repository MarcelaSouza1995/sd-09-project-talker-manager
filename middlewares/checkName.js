const { message } = require('../services');

const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: message.emptyName });
  if (name.length < 3) return res.status(400).json({ message: message.invalidName });
  next();
};

module.exports = checkName;
