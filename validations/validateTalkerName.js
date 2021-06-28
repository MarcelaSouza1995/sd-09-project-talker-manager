const validateTalkerName = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) {
    return next(res.status(400).json({ message: 'O campo "name" é obrigatório' }));
  }

  if (name.length < 3) {
    return next(res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }));
  }
  
  if (name.length === 0) {
    return next(res.status(400).json({ message: 'O campo "name" é obrigatório' }));
  }

  return next();
};

module.exports = validateTalkerName;