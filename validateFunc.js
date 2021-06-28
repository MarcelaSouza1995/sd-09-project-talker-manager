const validationEmail = (req, res, next) => {
    const { email } = req.body;
    const re = /\S+@\S+\.\S+/;
    if (!email || email.length === 0) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!re.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
};

const validationPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password || password.length === 0) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 5) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
};

const validationToken = (req, res, next) => {
    const { authorization } = req.headers;
    const tokenRegex = /^(\d|\w){16}$/gm;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (!tokenRegex.test(authorization)) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    return next();
};

const validationName = (req, res, next) => {
    const { name } = req.body;
    if (!name || name.length === 0) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    return next();
};

const validationAge = (req, res, next) => {
    const { age } = req.body;
    if (!age || age.length === 0) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (parseInt(age, 10) < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    return next();
};

const validationTalk = (req, res, next) => {
    const { talk } = req.body;
    if ((!talk || !talk.watchedAt) || (Number.isNaN(+talk.rate))) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }

    return next();
};

const validatorWatchedAtAndRate = (req, res, next) => {
    const { watchedAt, rate } = req.body.talk;
    const regexDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  
    if (!regexDate.test(watchedAt)) {
      return res.status(400).json({ 
          message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  
    if (rate < 1 || rate > 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  
    next();
  };

module.exports = {
    validationEmail,
    validationPassword,
    validationToken,
    validationName,
    validationAge,
    validationTalk,
    validatorWatchedAtAndRate,
};