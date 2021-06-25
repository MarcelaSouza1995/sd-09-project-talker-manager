const emailValidation = (email) => {
  if (!email) {
    return {
      status: 400,
      message: 'O campo "email" é obrigatório',
    };
  }

  const emailRegex = /^([\w./+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  if (!emailRegex.test(email)) {
    return {
      status: 400,
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return { status: 200 };
};

const passwordValidation = (password) => {
  if (!password) {
    return {
      status: 400,
      message: 'O campo "password" é obrigatório',
    };
  }

  if (password.length < 6) {
    return {
      status: 400,
      message: 'O "password" deve ter pelo menos 6 caracteres',
    };
  }

  return { status: 200 };
};

module.exports = {
  emailValidation,
  passwordValidation,
};
