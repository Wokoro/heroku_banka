
module.exports = (req, res, next) => {
  const { token } = req;
  if (JSON.parse(token.isAdmin)) {
    next();
  } else {
    res.json({
      status: 401,
      message: 'Access denied user not an admin',
    });
  }
};
