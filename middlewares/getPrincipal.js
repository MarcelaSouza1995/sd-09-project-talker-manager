const HTTP_OK_STATUS = 200;

module.exports = (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
};