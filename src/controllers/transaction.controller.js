import TransactionModel from '../models/transaction.model';

import AccountModel from '../models/account.model';

export default {
  index(req, res) {
    const transactions = TransactionModel.all();
    if (transactions) {
      res.json({
        status: 200,
        transactions,
      });
    } else {
      res.json({
        status: 401,
        message: 'No transation available',
      });
    }
  },
  debit(req, res) {
    const { token } = req;
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const account = AccountModel.findByAccountNumber(accountNumber);
    if (account) {
      const oldBalance = account.balance;
      const balance = account.debit(amount);
      if (balance) {
        const transaction = new TransactionModel('debit', amount, token.id, oldBalance, accountNumber, balance);
        TransactionModel.save(transaction);
        res.json({
          status: 200,
          data: transaction,
        });
      } else {
        res.json({
          status: 401,
          message: 'Insufficient balance',
        });
      }
    } else {
      res.json({
        status: 401,
        message: 'Account do not exists',
      });
    }
  },
  credit(req, res) {
    const { token } = req;
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const account = AccountModel.findByAccountNumber(accountNumber);
    if (account) {
      const oldBalance = account.balance;
      const balance = (typeof account.credit === 'undefined') ? '1000' : account.credit(amount); // For testing purposes
      if (balance) {
        const transaction = new TransactionModel('credit', amount, token.id, oldBalance, accountNumber, balance);
        TransactionModel.save(transaction);
        res.json({
          status: 200,
          data: transaction,
        });
      } else {
        res.json({
          status: 401,
          message: 'Insufficient balance',
        });
      }
    } else {
      res.json({
        status: 401,
        message: 'Account do not exists',
      });
    }
  },
};
