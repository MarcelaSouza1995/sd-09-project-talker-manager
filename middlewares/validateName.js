const validateName = (req, res, next) => {
  const { name } = req.body;
  const NAME_LENGTH = 3;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length <= NAME_LENGTH) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

module.exports = validateName;