function nameValidator(name) {
  let message = 'ok';
  if (!name || name === '') message = 'O campo "name" é obrigatório';
  if (name.length < 3) message = 'O "name" deve ter pelo menos 3 caracteres';
  return message;
}

function ageValidator(age) {
  let message = 'ok';
  if (!age || age === '') message = 'O campo "age" é obrigatório';
  if (age < 18) message = 'A pessoa palestrante deve ser maior de idade';
  return message;
}
function watchedAtValidator(watchedAt) {
  let message = 'ok';
  const dateRegex = new RegExp(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/);
  console.log(watchedAt);
  if (!dateRegex.test(watchedAt)) message = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  return message;
}

function rateValidator(rate) {
  let message = 'ok';
  if (rate < 1 || rate > 5) message = 'O campo "rate" deve ser um inteiro de 1 à 5'; 
  return message;
}

function ifTalkNotExists(talk) {
  let message = 'ok';
  if (!talk || !talk.watchedAt || !talk.rate) {
    message = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
    return message;
  }
  return message;
}

function talkerValidator(talk) {
  const message = 'ok';
  const { watchedAt, rate } = talk;
  if (ifTalkNotExists(talk) !== 'ok') return ifTalkNotExists(talk);
  if (watchedAtValidator(watchedAt) !== 'ok') return watchedAtValidator(watchedAt);
  if (rateValidator(rate) !== 'ok') return rateValidator(rate);
  return message;
}

function newTalkerValidator(name, age, talk) {
  const message = 'ok';
  if (nameValidator(name) !== 'ok') return nameValidator(name);
  if (ageValidator(age) !== 'ok') return ageValidator(age);
  if (talkerValidator(talk) !== 'ok') return talkerValidator(talk);
  return message;
}

module.exports = newTalkerValidator;