import UserModel from '../src/models/user.model';

export default async (req, res, next) => {
  const token = req.body.token || req.headers.authorization || req.headers['x-access-token'];
  const user = await UserModel.findUser('id', token.id);
  if (typeof user[0] !== 'undefined') {
    if (user[0].type === 'staff') {
      return next();
    }

    return res.status(401).json({
      status: 401,
      message: 'User not a staff. Access denied',
    });
  }
  return res.status(400).json({
    status: 404,
    message: 'Staff account do not exits please signup',
  });
};
