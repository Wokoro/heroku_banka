import UserModel from '../src/models/user.model';

export default async (req, res, next) => {
  const token = req.body.token || req.headers.authorization || req.headers['x-access-token'];
  const user = await UserModel.findUser('id', token.id);
  if (typeof user[0] !== 'undefined') {
    if (user[0].type === 'staff') {
      return next();
    }
    return res.json({
      status: 401,
      message: 'User not a staff',
    });
  }
  return res.json({
    status: 401,
    message: 'User account do not exits please sigup',
  });
};
