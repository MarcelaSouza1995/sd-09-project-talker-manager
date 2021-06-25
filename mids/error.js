const error = (err, req, res, _next) => {
    const { status, message } = err;
    return res.status(status).send(message);
};

module.exports = error;
