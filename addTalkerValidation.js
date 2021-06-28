const talksComponentsValidation = [{
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
}, {
    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
}];

const talkObjValidationResponse = {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const nameAgeResponses = [
    {
        message: 'O campo "name" é obrigatório',
    },
    {
        message: 'O "name" deve ter pelo menos 3 caracteres',
    },
    {
        message: 'O campo "age" é obrigatório',
    },
    {
        message: 'A pessoa palestrante deve ser maior de idade',
    },
];

const tokenResponses = [
    {
        message: 'Token não encontrado',
    },
    {
        message: 'Token inválido',
    },
];

const tokenValidation = (req, res, next) => {
    const { authorization } = req.headers;
    // A requisição deve ter o token de autenticação nos headers.
    const AUTH_REGEX = /^[0-9a-zA-Z]{16}$/;
    // regex  verifica se o token é composto de 16 caracteres entre
    // abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890   
    if (!authorization) return res.status(401).send(tokenResponses[0]);
    // Caso o token não seja encontrado retorne um código de status 401, com o seguinte corpo: { "message": "Token não encontrado" }
    if (!AUTH_REGEX.test(authorization)) return res.status(401).send(tokenResponses[1]);
    // Caso o token seja inválido retorne um código de status 401, com o seguinte corpo: { "message": "Token inválido" }
    next();
};

const nameAgeValidation = (req, res, next) => {
    const { body: { name, age } } = req;
    // O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
    // Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo: { "message": "O campo \"name\" é obrigatório" }
    if (!name) return res.status(400).send(nameAgeResponses[0]);
    // Caso o nome não tenha pelo menos 3 caracteres retorne um código de status 400, com o seguinte corpo: { "message": "O \"name\" deve ter pelo menos 3 caracteres" }
    if (name.length < 3) return res.status(400).send(nameAgeResponses[1]);
    // O campo age deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.
    // Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo: { "message": "O campo \"age\" é obrigatório" }
    if (!age) return res.status(400).send(nameAgeResponses[2]);
    // Caso a pessoa palestrante não tenha pelo menos 18 anos retorne status 400, com o seguinte corpo: { "message": "A pessoa palestrante deve ser maior de idade" }
    if (age < 18) return res.status(400).send(nameAgeResponses[3]);
    next();
};

const talkObjValidation = (req, res, next) => {
    const { talk } = req.body;
    // O campo talk é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.
    // Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne status 400, com o seguinte corpo: { "message": "O campo \"talk\" é obrigatório e \"watchedAt\" e \"rate\" não podem ser vazios" }
    if (!talk) return res.status(400).send(talkObjValidationResponse);
    if (!talk.watchedAt
        || (!talk.rate && talk.rate !== 0)) return res.status(400).send(talkObjValidationResponse);
    next();
};

const talkComponentsValidation = (req, res, next) => {
    const { talk: { watchedAt, rate } } = req.body;
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
    // A chave watchedAt deve ser uma data no formato dd/mm/aaaa.
    // Caso a data não respeito o formato dd/mm/aaaa retorne status 400, com o seguinte corpo: { "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"" }
    if (!dateRegex.test(watchedAt)) return res.status(400).send(talksComponentsValidation[0]);
    // A chave rate deve ser um inteiro de 1 à 5.
    // Caso a nota não seja um inteiro de 1 à 5 retorne status 400, com o seguinte corpo: { "message": "O campo \"rate\" deve ser um inteiro de 1 à 5" }
    if (!Number.isInteger(rate)
        || rate < 1 || rate > 5) return res.status(400).send(talksComponentsValidation[0]);
    next();
};

module.exports = {
    talkComponentsValidation,
    talkObjValidation,
    tokenValidation,
    nameAgeValidation,
};
