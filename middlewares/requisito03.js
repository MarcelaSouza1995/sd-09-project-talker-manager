const generateToken = require('../utils/generateToken');
const validateEmailPassword = require('../utils/validators/validateEmailPassword');

const loginValidate = (req, res) => {
  const { email, password } = req.body;
  const message = validateEmailPassword(email, password);

  if (message) return res.status(400).json({ message });

  return res.json({ token: generateToken() });
};

module.exports = loginValidate;
