import AccountModel from '../src/models/account.model';

export default async (req, res, next) => {
  const { accountNumber } = req.params;
  const { amount } = req.body;
  const result = await AccountModel.find('accountnumber', accountNumber);
  const account = result[0];
  if (Number(account.balance) < amount) {
    return res.json({
      status: 400,
      message: 'Insufficient balance',
    });
  }
  req.body.account = account;
  return next();
};
