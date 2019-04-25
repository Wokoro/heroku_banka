import UserModel from '../src/models/user.model';

export default async (req, res, next) => {
  const token = req.body.token || req.headers.authorization || req.headers['x-access-token'];
  const user = await UserModel.find('id', token.id);
  if (user[0].type === 'staff') {
    next();
  } else {
    res.json({
      status: 401,
      message: 'Access denied user not staff',
    });
  }
};
