const talkerRequest = require('./talkerRequest');
const idSearch = require('./idSearch');
const authentication = require('./authentication');
const tokenValidation = require('./tokenValidation');
const talkerValidation = require('./talkerValidation');
const validationDate = require('./talkerDateValidation');
const addNewTalker = require('./addTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');

module.exports = {
    talkerRequest,
    idSearch,
    authentication,
    tokenValidation,
    talkerValidation,
    validationDate,
    addNewTalker,
    editTalker,
    deleteTalker,
};
