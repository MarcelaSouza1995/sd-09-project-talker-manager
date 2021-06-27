const verifyTalkerAge = (req, res, next) => {
  // const age = req.body.age ? req.body.age : false;
  const AGE_NOT_FOUND = 400;
  
  const { age } = req.body;

  if (!age) {
      return res.status(AGE_NOT_FOUND)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(AGE_NOT_FOUND)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = verifyTalkerAge;