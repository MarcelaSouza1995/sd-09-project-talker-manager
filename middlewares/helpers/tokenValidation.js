const tokenValidation = (authorization) => {
  if (!authorization) {
    return {
      status: 401,
      message: 'Token não encontrado',
    };
  }

  if (authorization.length < 16) {
    return {
      status: 401,
      message: 'Token inválido',
    };
  }

  return { status: 201 };
};

module.exports = tokenValidation;
