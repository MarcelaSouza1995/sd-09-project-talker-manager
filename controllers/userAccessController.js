const tokens = require('../tokens');

module.exports = {
  login(req, res, next) {
    try {
      const accessToken = tokens.access.create();
      res.status(200).json(accessToken);
    } catch (err) {
      next(err);
    }
  },
};
