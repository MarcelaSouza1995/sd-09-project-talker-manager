const code = require('../httpStatusCodeList');
const readTalkersJson = require('../services/readTalkerJson');
const writeTalkerJson = require('../services/writeTalkerJson');

const addTalkerMiddleware = async (req, res, next) => {
  try {
    const talkersArray = await readTalkersJson();
    const newTalk = { id: talkersArray.length + 1, ...req.body };
    talkersArray.push(newTalk);
    writeTalkerJson(talkersArray);
    res.status(code.created).json(newTalk);
  } catch (err) {
    next({ message: err, status: code.internalServerError });
  }
};

module.exports = addTalkerMiddleware;