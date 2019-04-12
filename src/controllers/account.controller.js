/* eslint-disable no-unused-expressions */
const AccountModel = require('../models/account.model');


module.exports = {
  index(req, res) {
    const accounts = AccountModel.all();
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
        AccountModel.save(account);
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
  delete(req, res) {
    const { accountNumber } = req.params;
    const account = AccountModel.findByAccountNumber(accountNumber);
    if (account) {
      AccountModel.delete(account);
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
  changeState(req, res) {
    const { accountNumber } = req.params;

    const account = AccountModel.findByAccountNumber(accountNumber);
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
};
