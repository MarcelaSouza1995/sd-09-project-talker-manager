const yup = require('yup');

const SIX_CHAR = 6;

module.exports = {
  emailValidate: yup.object().shape({ email: yup.string().email().required() }),
  passValidate: yup.object().shape({ password: yup.string().min(SIX_CHAR).required() }),
};