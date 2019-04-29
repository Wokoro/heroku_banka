import AccountModel from '../src/models/account.model';
import UserModel from '../src/models/user.model';
import TransactionModel from '../src/models/transaction.model';

export default async (req, res, next) => {
  const token = req.body.token || req.headers.authorization || req.headers['x-access-token'];
  try {
    const user = token ? await UserModel.findUser('id', token.id) : false;
    const { transactionID } = req.params;

    const transaction = await TransactionModel.findTransaction('id', transactionID);

    const { accountnumber } = transaction[0];

    if (user[0].type === 'staff') {
      return next();
    }
    if (user[0].type === 'client') {
      const result = await AccountModel.findAccount('accountnumber', accountnumber);

      if (result[0].userid === token.id) {
        return next();
      }
      return res.json({
        status: 401,
        message: 'Access denied can\'t access this account',
      });
    }
  } catch (err) {
    res.json({ status: 500, message: `An error occured. ${err}` });
  }
  return res.json({
    status: 401,
    message: 'Invalid User. Access denied',
  });
};
