const verifyData = (date) => {
  const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return regexData.test(date);
};

const watchedAtVerify = (request, response) => {
const { talk } = request.body;
  if (!verifyData(talk.watchedAt)) {
    return response.status(400).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }
  if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
    return response.status(400).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }
};

const validationDate = (request, response, next) => {
  if (watchedAtVerify(request, response)) return;
  next();
};

module.exports = validationDate;