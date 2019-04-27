import AccountModel from '../src/models/account.model';
import UserModel from '../src/models/user.model';

export default async (req, res, next) => {
  const token = req.body.token || req.headers.authorization || req.headers['x-access-token'];
  const user = token ? await UserModel.findUser('id', token.id) : false;
  const { accountNumber } = req.params;
  if (user[0].type === 'staff') {
    return next();
  }
  if (user[0].type === 'client') {
    const result = await AccountModel.findAccount('accountnumber', accountNumber);
    if (result[0].userid === token.id) {
      return next();
    }
    return res.json({
      status: 401,
      message: 'Access denied can\'t access this account',
    });
  }
  return res.json({
    status: 401,
    message: 'Invalid User. Access denied',
  });
};
