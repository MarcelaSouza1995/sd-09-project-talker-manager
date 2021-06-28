const { getTalkerById } = require('../funcoes/readFileTalkers');

const HTTP_OK_STATUS = 200;
const HTTP_NE_STATUS = 404;

module.exports = (req, res, next) => {
  console.log(req.query);
  const { id } = req.query;
  if (!id) {
    return next();
  }
  getTalkerById(id)
  .then((talker) => {
    if (!talker.id) {
     return next({ status: HTTP_NE_STATUS, message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(talker);
 })
  .catch((error) => { 
    res.status(HTTP_NE_STATUS).json({ message: error.message });
    });
};