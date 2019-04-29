import AccountModel from '../src/models/account.model';

export default async (req, res, next) => {
  const { accountNumber } = req.params;
  const { amount } = req.body;
  const result = await AccountModel.findAccount('accountnumber', accountNumber);
  const account = result[0];
  if (Number(account.balance) < amount) {
    return res.status(400).json({
      status: 400,
      message: 'Insufficient fund',
    });
  }
  req.body.account = account;
  return next();
};
