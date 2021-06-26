const { generateToken } = require('../services');

const login = (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
};

module.exports = login;
