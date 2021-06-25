const regexChecktalk = ((req, res, next) => {
  const { talk } = req.body;

  const watchedAtRegexCheck = /^(0\d|1\d|2\d|3[0-1])\/(0\d|1[0-2])\/(19|20)\d{2}$/;
  if (!watchedAtRegexCheck.test(talk.watchedAt)) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
    const rateRegexCheck = /^[1-5]$/;
  if (!rateRegexCheck.test(talk.rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
});

module.exports = regexChecktalk;
