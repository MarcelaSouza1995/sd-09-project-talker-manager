function emailValidator(email) {
  const emailRegex = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
  return emailRegex.test(email);
}

function passwordValidator(password) {
  if (password.toString().length < 6) {
    return false;
  } 
  return true;
}

module.exports = { emailValidator, passwordValidator };
