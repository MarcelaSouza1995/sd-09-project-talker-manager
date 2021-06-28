const Result = require('./result');

function nameValidator(name) {
    if (!name) {
        return Result.fail('O campo "name" é obrigatório');
    }
    if (name.length < 3) {
        return Result.fail('O "name" deve ter pelo menos 3 caracteres');
    }
    return Result.ok();
}

function ageValidator(age) {
    if (!age) {
        return Result.fail('O campo "age" é obrigatório');
    }
    if (age < 18) {
        return Result.fail('A pessoa palestrante deve ser maior de idade');
    }
    return Result.ok();
}

const isTalkValid = (talk) => talk && talk.rate && talk.watchedAt;

const isRateValid = (rate) => rate && rate >= 1 && rate <= 5;

const isWatchedAtValid = (watchedAt) => watchedAt && RegExp('\\d{2}/\\d{2}/\\d{4}').test(watchedAt);

function talkValidator(talk) {
    if (!isTalkValid(talk)) {
        return Result
            .fail('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios');
    }
    if (!isWatchedAtValid(talk.watchedAt)) {
        return Result.fail('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
    }
    if (!isRateValid(talk.rate)) {
        return Result.fail('O campo "rate" deve ser um inteiro de 1 à 5');
    }
    return Result.ok();
}

function createTalkerValidator(req, res, next) {
    const { name, age, talk } = req.body;

    const nameResult = nameValidator(name);
    if (!nameResult.ok) {
        return res.status(400).json({ message: nameResult.msg });
    }
    const ageResult = ageValidator(age);
    if (!ageResult.ok) {
        return res.status(400).json({ message: ageResult.msg });
    }
    const talkResult = talkValidator(talk);
    if (!talkResult.ok) {
        return res.status(400).json({ message: talkResult.msg });
    }
    next();
}

module.exports = createTalkerValidator;