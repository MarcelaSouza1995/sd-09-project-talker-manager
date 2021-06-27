const code = require('../httpStatusCodeList');
const messageError = require('../services/messagesOfError');

const tokenValidate = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next({ message: messageError.tokenNotFound, status: code.unauthorized });
  }
  if (authorization.length !== 16) {
    return next({ message: messageError.tokenInvalid, status: code.unauthorized });
  }
  return next();
};

module.exports = tokenValidate;
