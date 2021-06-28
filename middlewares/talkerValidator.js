const nameTest = (name) => {
  if (!name || name === '') {
    return ({ code: 400, message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return ({ code: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return 'ok';
};

const ageTest = (age) => {
  if (!age || age === '') {
    console.log('entrou no teste age');
    return ({ code: 400, message: 'O campo "age" é obrigatório' });
  } if (parseInt(age, 10) < 18) {
    return ({ code: 400, message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return 'ok';
};

const dateTest = (watchedAt) => {
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!dateRegex.test(watchedAt)) {
    return ({ code: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
  return 'ok';
};

const rateTest = (rate) => {
  const rateInt = parseInt(rate, 10);
  if (rateInt > 5 || rateInt < 1) {
    return ({ code: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return 'ok';
};

const talkTest = (talk) => {
  if (!talk || talk === '' || !talk.watchedAt || !talk.rate) {
    return ({ 
      code: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  });
  }
  return 'ok';
};

const talkObjTest = (talk) => {
  const talkStatus = talkTest(talk);
  if (talkStatus !== 'ok') return talkStatus;
  const rateStatus = rateTest(talk.rate);
  if (rateStatus !== 'ok') return rateStatus;
  const watchedStatus = dateTest(talk.watchedAt);
  if (watchedStatus !== 'ok') return watchedStatus;
  return 'ok';
};

const talkerValidator = (req, _res, next) => {
  const { name, age, talk } = req.body;
  const nameStatus = nameTest(name);
  if (nameStatus !== 'ok') return next(nameStatus);
  const ageStatus = ageTest(age);
  if (ageStatus !== 'ok') return next(ageStatus);
  const talkStatus = talkObjTest(talk);
  if (talkStatus !== 'ok') return next(talkStatus);
  return next();
};

module.exports = talkerValidator;