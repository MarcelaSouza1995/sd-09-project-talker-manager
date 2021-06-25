/*
Regex found at: https://www.w3resource.com/javascript/form/javascript-date-validation.php
*/

const validateDate = (date) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return regex.test(date);
};

module.exports = validateDate;
