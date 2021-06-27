const { InvalidArgumentError } = require('../errors');

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const emptyFieldTest = (fieldName, fieldValue) => (fieldValue ? fieldName : '');
const validEmail = (email) => EMAIL_REGEX.test(email);
const validPassword = (password) => password.length >= 6;

module.exports = {
  emptyFieldsValidation(body) {
    const { email, password } = body;
    const bodyCopy = { email, password };
    Object.keys(bodyCopy).forEach((field) => {
      const emptyField = emptyFieldTest(field, bodyCopy[field]);
      if (!emptyField) throw new InvalidArgumentError(`O campo "${field}" é obrigatório`);
    });
  },
  fieldsPatternValidation(body) {
    const { email, password } = body;
    const stringPassword = password ? password.toString() : '';
    if (!validEmail(email)) {
      throw new InvalidArgumentError('O "email" deve ter o formato "email@email.com"');
    }
    if (!validPassword(stringPassword)) {
      throw new InvalidArgumentError('O "password" deve ter pelo menos 6 caracteres');
    }
  },
};