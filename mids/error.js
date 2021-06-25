const error = (err, req, res, _next) => {
    const { status, message } = err;
    return res.status(status).json({ message });
};

module.exports = error;
