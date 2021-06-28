const TOKEN = '7mqaVRXJSp886CGr';

function tokenValidator(token) {
  if (token === TOKEN) {
    return true;
  }
  return false;
}

module.exports = { TOKEN, tokenValidator };