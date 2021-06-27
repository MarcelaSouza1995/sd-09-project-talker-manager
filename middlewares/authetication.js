const { TokenError } = require('../errors');
const validations = require('../validations');
const tokens = require('../tokens');

module.exports = {
  local(req, res, next) {
    try {
      const { body } = req;

      validations.login.emptyFieldsValidation(body);
      validations.login.fieldsPatternValidation(body);

      req.autheticated = true;
      return next();
    } catch (err) {
      return next(err);
    }
  },
  bearer(req, res, next) {
    const { authorization: token } = req.headers;
    try {
      if (!token) {
        throw new TokenError('Token não encontrado');
      }

      tokens.access.verify(token);

      return next();
    } catch (err) {
      return next(err);
    }
  },
};