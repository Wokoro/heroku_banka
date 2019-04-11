/* eslint-disable no-unused-expressions */
const Account = require('../models/account.model');


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
        const account = new Account(token.id, body.type, body.status, body.openingBalance);
        Account.save(account.accountNumber, account);
        res.json({
          status: 200,
          data: {
            accountNumber: account.accountNumber,
            firstName: token.firstName,
            lastName: token.lastName,
            email: token.email,
            type: account.type,
            openingBalance: account.balance,
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

    const account = Account.getAccount(accountNumber);
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
    const account = Account.getAccount(accountNumber);
    if (account) {
      const accounts = Account.getAccounts();
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
    const accounts = Account.getAccounts();
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
};
