const express = require('express');
const { validateEmail, generateToken, validatePassword } = require('../util');

const router = express.Router();
const HTTP_OK_STATUS = 200;

router.post('/', validateEmail, validatePassword, (request, response) => {
  const token = generateToken();
  response.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;
