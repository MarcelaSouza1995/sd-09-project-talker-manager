const numberInteger = (rate) => {
  if (rate < 1 || rate > 5) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }

  return null;
};

const validateTalkRate = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.rate) {
    return next(
      res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      }),
    );
  }

  if (numberInteger(talk.rate)) {
    return next(res.status(400).json({ message: numberInteger(talk.rate) }));
  }

  return next();
};

module.exports = validateTalkRate;
