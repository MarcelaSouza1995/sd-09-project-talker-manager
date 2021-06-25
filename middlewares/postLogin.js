const crypto = require('crypto');
const { emailValidation, passwordValidation } = require('./helpers/loginValidation');

const postLogin = (req, res, _next) => {
  try {
    const token = crypto.randomBytes(8).toString('hex');
    const { email, password } = req.body;
    const emailStatus = emailValidation(email);
    const passwordStatus = passwordValidation(password);

    if (emailStatus.status !== 200) {
      return res.status(emailStatus.status).json({ message: emailStatus.message });
    }

    if (passwordStatus.status !== 200) {
      return res.status(passwordStatus.status).json({ message: passwordStatus.message });
    }

    return res.status(200).send({ token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postLogin;
