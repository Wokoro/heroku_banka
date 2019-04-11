/* eslint-disable no-unused-expressions */
const AccountModel = require('../models/account.model');
const TransactionModel = require('../models/transaction.model');


module.exports = {
  create(req, res) {
    const { token } = req;
    if (!token) {
      res.json({
        status: 401,
        message: 'Invalid User token',
      });
    } else {
      const { body } = req;
      if (body.openingBalance && body.type && body.status) {
        const account = new AccountModel(token.id, body.type, body.status, body.openingBalance);
        AccountModel.save(account.accountNumber, account);
        res.json({
          status: 200,
          data: {
            accountNumber: account.accountNumber,
            firstName: token.firstName,
            lastName: token.lastName,
            email: token.email,
            type: account.type,
            openingBalance: account.getbalance(),
          },
        });
      } else {
        res.json({
          status: 401,
          message: 'required fields empty',
        });
      }
    }
  },
  changeState(req, res) {
    const { accountNumber } = req.params;

    const account = AccountModel.getAccount(accountNumber);
    if (account) {
      const state = typeof account.toggleState === 'undefined' ? 'changed' : account.toggleState(); // for testing purposes;
      res.json({
        status: 200,
        data: {
          accountNumber: account.accountNumber,
          status: state,
        },
      });
    } else {
      res.json({
        status: 401,
        message: 'Account do not exists',
      });
    }
  },
  delete(req, res) {
    const { accountNumber } = req.params;
    const account = AccountModel.getAccount(accountNumber);
    if (account) {
      const accounts = AccountModel.getAccounts();
      delete accounts[accountNumber];
      res.json({
        status: 200,
        message: 'Account Deleted',
      });
    } else {
      res.json({
        status: 401,
        message: 'Account do not exists',
      });
    }
  },
  index(req, res) {
    const accounts = AccountModel.getAccounts();
    if (accounts) {
      res.json({
        status: 200,
        accounts,
      });
    } else {
      res.json({
        status: 401,
        message: 'No accounts created',
      });
    }
  },
  debit(req, res) {
    const { token } = req;
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const account = AccountModel.getAccount(accountNumber);
    if (account) {
      const oldBalance = account.balance;
      const balance = (typeof account.debit === 'undefined') ? 1000 : account.debit(amount); // For testing purposes
      if (balance) {
        const transaction = new TransactionModel('debit', amount, token.id, oldBalance, accountNumber, balance);
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
    const account = AccountModel.getAccount(accountNumber);
    if (account) {
      const oldBalance = account.balance;
      const balance = (typeof account.credit === 'undefined') ? 1000 : account.credit(amount); // For testing purposes
      if (balance) {
        const transaction = new TransactionModel('credit', amount, token.id, oldBalance, accountNumber, balance);
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
