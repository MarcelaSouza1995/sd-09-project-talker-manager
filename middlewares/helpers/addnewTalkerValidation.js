const nameValidation = (name) => {
  if (!name) return { status: 400, message: 'O campo "name" é obrigatório' };

  if (name.length < 3) {
    return { status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
  }

  return { status: 200 };
};

const ageValidation = (age) => {
  const ageRegex = /^\d+$/i;

  if (!age) return { status: 400, message: 'O campo "age" é obrigatório' };

  if (age < 18) return { status: 400, message: 'A pessoa palestrante deve ser maior de idade' };
  
  if (!ageRegex.test(age)) return { status: 400, message: 'not a number' };

  return { status: 200 };
};

const talkValidation = (talk) => {
  if (!talk || !talk.rate || !talk.watchedAt) {
    return {
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }

  return { status: 200 };
};

const watchedAtValidation = (watchedAt) => {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!dateRegex.test(watchedAt)) {
    return {
      status: 400,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }

  return { status: 200 };
};

const rateValidation = (rate) => {
  if (rate < 1 || rate > 5) {
    return {
      status: 400,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
  }

  return { status: 200 };
};

module.exports = {
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
};
