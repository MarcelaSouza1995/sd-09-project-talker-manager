const { InvalidArgumentError } = require('../errors');

function validateWatchedAt(date) {
  const DATE_REGEX = /^(0[1-9]|1\d|2\d|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (!DATE_REGEX.test(date)) {
    throw new InvalidArgumentError('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
}

function validateRate(rate) {
  if (Number(rate) < 1 || Number(rate) > 5) {
    throw new InvalidArgumentError('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

module.exports = {
  validateUserName(name) {
    if (!name) throw new InvalidArgumentError('O campo "name" é obrigatório');
    if (name.length < 3) {
      throw new InvalidArgumentError('O "name" deve ter pelo menos 3 caracteres');
    }
  },
  validateUserAge(age) {
    if (!age) throw new InvalidArgumentError('O campo "age" é obrigatório');
    if (Number(age) < 18) {
      throw new InvalidArgumentError('A pessoa palestrante deve ser maior de idade');
    }
  },
  validateTalkData(talk) {
    if (talk) {
      const { watchedAt, rate } = talk;

      if (watchedAt && rate) {
        validateWatchedAt(watchedAt);
        validateRate(rate);
        return;
      }
    }

    throw new InvalidArgumentError(
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    );
  },
};