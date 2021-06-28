const rgx = new RegExp(/\d{2}\/\d{2}\/\d{4}/);

const watchedAtValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!rgx.test(talk.watchedAt)) {
    return (res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }));
  }

  if (!talk.watchedAt) { 
     return (res.status(400).json({
       message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }));
  }
  
  next();
};

module.exports = watchedAtValidation; 