const { emailValidator, passwordValidator } = require('./validators');

function loginValidator(req, res, next) {
    const { password, email } = req.body;
    const emailResult = emailValidator(email);
    if (!emailResult.ok) {
        return res.status(400).json({ message: emailResult.msg });
    }
    const passwordResult = passwordValidator(password);
    if (!passwordResult.ok) {
        return res.status(400).json({ message: passwordResult.msg });
    }
    return next();
}

module.exports = loginValidator;