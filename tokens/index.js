const { TokenError } = require('../errors');

module.exports = {
  access: {
    create() {
      const TEST_TOKEN = {
        token: '7mqaVRXJSp886CGr',
      };
      return TEST_TOKEN;
    },
    verify(token) {
      const TOKEN_LENGTH = 16;

      if (token.length !== TOKEN_LENGTH) {
        throw new TokenError('Token inválido');
      }
    },
  },
};