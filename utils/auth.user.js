
export default (req, res, next) => {
  const bearerHeader = req.headers.authorization || req.headers['x-access-token'] || req.body.token;

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    res.json({
      status: 403,
      message: 'Access denied login required',
    });
  }
};
