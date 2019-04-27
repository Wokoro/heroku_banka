import UserModel from '../src/models/user.model';

export default async (req, res, next) => {
  const { token } = req.body;
  const user = token ? await UserModel.findUser('id', token.id) : false;
  const { email } = user[0];
  if (user[0].type === 'client') {
    res.redirect(`user/${email}/accounts`);
  } else {
    next();
  }
};
