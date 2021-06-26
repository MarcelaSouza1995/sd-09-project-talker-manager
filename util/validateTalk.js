const HTTP_BAD_REQUEST_STATUS = 400;
const defaultMessage = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

function validateWatchedAt(watchedAt) {
  const watchedAtRegex = /\d{2}\/\d{2}\/\d{4}/;
  const validWatchedAt = watchedAtRegex.test(watchedAt);

  if (!watchedAt) return defaultMessage;

  if (!validWatchedAt) {
    return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  }
}

function validateRate(rate, message) {
  if (!rate) return defaultMessage;

  if (rate < 1 || rate > 5) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  
  return message;
}

function validateTalk(request, response, next) {
  const { talk } = request.body;
  if (!talk) return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: defaultMessage });
  const { watchedAt, rate } = talk;
  let message = validateWatchedAt(watchedAt);
  message = validateRate(rate, message);
  if (message) {
    return response.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message });
  }
  next();
}

module.exports = validateTalk;
