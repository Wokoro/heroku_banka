/* eslint-disable no-unused-expressions */
const Utils = require('../../utils/utils');
const Account = require('../models/account.model');


module.exports = {
  create(req, res) {
    const token = Utils.verifyToken(req.token);
    if (!token) {
      res.json({
        status: 401,
        message: 'login required',
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
};
