
export default (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    res.json({
      status: 401,
      message: 'Access denied login required',
    });
  }
};
