const tokenGenerator = (req, res, next) => {
  try {
    const token = '7mqaVRXJSp886CGr';
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = tokenGenerator;