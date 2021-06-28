const nameVerify = (request, response) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response.status(400).json(
      { message: 'O campo "name" é obrigatório' },
    );
  }
  if (name.length <= 4) {
    return response.status(400).json(
      { message: 'O "name" deve ter pelo menos 3 caracteres' },
    );
  }
};

const ageVerify = (request, response) => {
  const { age } = request.body;
  if (!age || age === '') {
    return response.status(400).json(
      { message: 'O campo "age" é obrigatório' },
      );
  }
  if (Number(age) <= 17) {
    return response.status(400).json(
      { message: 'A pessoa palestrante deve ser maior de idade' },
    );
  }
};

const emptyVerify = (request, response) => {
  const { talk } = request.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return response.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
};

const talkerValidation = (request, response, next) => {
  if (nameVerify(request, response)) return;
  if (ageVerify(request, response)) return;
  if (emptyVerify(request, response)) return;

  next();
};

module.exports = talkerValidation;
