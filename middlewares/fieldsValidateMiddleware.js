const code = require('../httpStatusCodeList');
const messageError = require('../services/messagesOfError');

const validateNameField = (name) => {
  if (!name) return messageError.nameRequerid;
  if (name.length < 3) return messageError.nameInvalid;
};

const validateAgeField = (age) => {
  if (!age) return messageError.ageRequerid;
  if (age < 18) return messageError.ageInvalid;
};

const validateRateField = (rate) => {
  const conditionRate = rate >= 1 && rate <= 5;
  if (!rate) return messageError.talkRequerid;
  if (!conditionRate) return messageError.rateInvalid;
};

const validateWatchedAtField = (watchedAt) => {
  const regex = /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[12])\/(19|20)\d{2}/;
  if (!watchedAt) {
    return messageError.talkRequerid;
  }
  if (!regex.test(watchedAt)) {
    return messageError.watchedAtInvalid;
  }
};

const validateTalkField = (talk) => {
  if (!talk) return messageError.talkRequerid;

  const watchedErrorMessage = validateWatchedAtField(talk.watchedAt);
  const rateErrorMessage = validateRateField(talk.rate);

  if (watchedErrorMessage) return watchedErrorMessage;
  if (rateErrorMessage) return rateErrorMessage;
};

const fieldsTalkersValidate = (req, _res, next) => {
  const { name, age, talk } = req.body;
  const nameErrorMessage = validateNameField(name);
  const ageErrorMessage = validateAgeField(age);
  const talkErrorMessage = validateTalkField(talk);

  if (nameErrorMessage) {
    return next({ message: nameErrorMessage, status: code.badRequest });
  }
  if (ageErrorMessage) {
    return next({ message: ageErrorMessage, status: code.badRequest });
  }
  if (talkErrorMessage) {
    return next({ message: talkErrorMessage, status: code.badRequest });
  }
  return next();
};

module.exports = fieldsTalkersValidate;
