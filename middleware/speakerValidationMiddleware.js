/* const watchedAtRegex = /\d{2}\/\d{2}\/\d{4}/;

const dateValidation = (talk, next) => {
  const teste = watchedAtRegex.test(talk.watchedAt);
  if (!teste) {
    return next({ code: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  console.log(talk.watchedAt);
  console.log(watchedAtRegex.test(talk.watchedAt));
};

const scoreValidate = (talk, next) => {
  if (!Number.isInteger(talk.rate)) {
    return next({ code: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (talk.rate < 1 && talk.rate < 5) {
    return next({ code: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const speakerValidation = (talk, next) => {
  if (!talk.watchedAt || !talk.rate) {
    return next({
      code: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
};
 */
const speakerValidationMiddleware = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) return next({ code: 400, message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return next({ code: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) return next({ code: 400, message: 'O campo "age" é obrigatório' });
  if (age < 18) return next({ code: 400, message: 'A pessoa palestrante deve ser maior de idade' });
  next();
};

module.exports = speakerValidationMiddleware;
