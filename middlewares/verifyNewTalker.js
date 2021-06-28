const { newTalkerValidator } = require('../util');

const verifyNewTalker = (req, res, next) => {
  const { name, age, talk } = req.body;
  const validationResult = newTalkerValidator(name, age, talk);
  console.log(validationResult);
  if (validationResult !== 'ok') {
    return res.status(400).json({ message: validationResult });
  }
  next();
};

module.exports = verifyNewTalker;