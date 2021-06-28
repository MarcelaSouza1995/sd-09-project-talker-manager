const validateAge = (req, res, next) => {
  const { age } = req.body;
  const regex = /^\d+$/;

  if (!age) {
    return next(res.status(400).json({ message: 'O campo "age" é obrigatório' }));
  }
  if (!regex.test(age)) {
    return next(res.status(400).json({ message: 'O campo "age" deverá ser um inteiro' }));
  }
  if (parseInt(age, 10) < 18) {
    return next(
      res
        .status(400)
        .json({ message: 'A pessoa palestrante deve ser maior de idade' }),
    );
  }

  return next();
};

module.exports = validateAge;
