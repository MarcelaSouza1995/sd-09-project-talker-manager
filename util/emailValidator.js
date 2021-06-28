function emailValidator(email) {
  const emailRegex = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
  return emailRegex.test(email);
}

module.exports = emailValidator;
