const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const number = Number(rate);

  if (rate === undefined) {
    return next(res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
   },
));
  }

   if (number > 5 || number < 1) {
    return next(res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }));
   }
   return next();
};

module.exports = validateRate;