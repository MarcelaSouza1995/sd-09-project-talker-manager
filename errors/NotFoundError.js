class NotFoundError extends Error {
  constructor(entity) {
    super();
    this.name = 'NotFoundError';
    this.message = `${entity} não encontrada`;
  }
}

module.exports = NotFoundError;
