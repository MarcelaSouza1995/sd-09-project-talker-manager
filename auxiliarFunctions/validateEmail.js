const validateEmail = (email) => {
  const emailRegexCheck = /^([\w]+)@([\w]+\.)+([\w]{2,})/i;
  if (!emailRegexCheck.test(email)) return false;

  return true;
  };

module.exports = validateEmail;
