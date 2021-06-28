function passwordValidator(password) {
  if (password.toString().length < 6) {
    return false;
  } 
  return true;
}

module.exports = passwordValidator;