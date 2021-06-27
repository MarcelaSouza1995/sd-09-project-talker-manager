const { readFile } = require('../middlewares');

module.exports = {
  getTalkers(req, res, next) {
    try {
      const talkersData = readFile();
      res.status(200).json(talkersData);
    } catch (err) {
      next(err);
    }
  },
  getTalkerById(req, res) {
    const { id } = req.params;

    try {
      const talkersData = fs.readFileSync(talkersFile, 'utf8');
      if (talkersData.length > 0) {
        res.status(200).json(JSON.parse(talkersData));
      } else {
        res.status(200).json([]);
      }
    } catch (err) {
      throw new FileError(talkersFile);
    }
  },
};