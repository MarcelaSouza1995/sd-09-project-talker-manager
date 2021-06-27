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
  const conditionRate = rate < 1 || rate > 5;
  if (conditionRate) return messageError.rateInvalid;
  if (!rate) return messageError.talkRequerid;
};

const validateWatchedAtField = (watchedAt) => {
  const regex = /\d{2}\/\d{2}\/\d{4}/;

  if (!watchedAt) {
    return messageError.talkRequerid;
  }
  if (!regex.test(watchedAt)) {
    return messageError.watchedAtInvalid;
  }
};

const validateTalkField = (talk) => {
  if (!talk) return messageError.talkRequerid;

  const rateErrorMessage = validateRateField(talk.rate);
  const watchedErrorMessage = validateWatchedAtField(talk.watchedAt);

  if (rateErrorMessage) return rateErrorMessage;
  if (watchedErrorMessage) return watchedErrorMessage;
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
