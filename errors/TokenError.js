class TokenError extends Error {
  constructor(message) {
    super();
    this.name = 'TokenError';
    this.message = message;
  }
}

module.exports = TokenError;
