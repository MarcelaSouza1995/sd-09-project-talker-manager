const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    // estava usando "!talk.rate" porém ele estava caindo como erro de rate vazio
    // ao invés de validar aqui e falhar no mw que checa se rate < 0.
    // não entendi o motivo, mas descobri a falha vendo o teste.
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  return next();
};

module.exports = validateTalk;
