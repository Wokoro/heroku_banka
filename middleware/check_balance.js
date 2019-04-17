import AccountModel from '../src/models/account.model';

export default (req, res, next) => {
  const { accountNumber } = req.params;
  const { amount } = req.body;
  const account = AccountModel.findByAccountNumber(accountNumber);
  if (account.balance < amount) {
    return res.json({
      status: 401,
      message: 'Insufficient balance',
    });
  }
  req.body.account = account;
  return next();
};
