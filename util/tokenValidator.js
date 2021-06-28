const TOKEN = '7mqaVRXJSp886CGr';

function tokenValidator(token) {
  if (token.length !== 16) {
    return true;
  }
  return false;
}

module.exports = { TOKEN, tokenValidator };