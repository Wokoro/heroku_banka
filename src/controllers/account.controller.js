/* eslint-disable object-curly-newline */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable no-unused-expressions */

import AccountModel from '../models/account.model';

export default {
  /**
  * Gets all bank accounts created
  * @param {string} req
  * @param {string} res
  * @returns {object} returns all accounts
  */
  index(req, res) {
    const accounts = AccountModel.all();

    if (accounts) { return res.json({ status: 200, accounts }); }

    return res.json({ status: 401, message: 'No accounts created' });
  },

  /**
  * function to create bank account
  * @param {string} req
  * @param {string} res
  * @returns {object} returns a response object
  */
  create(req, res) {
    const { id, firstName, lastName, email } = req.token;

    const { type, status, openingBalance } = req.body;

    const account = new AccountModel(id, type, status, openingBalance);

    const { accountNumber } = account;

    AccountModel.save(account);

    res.json({
          status: 200,
          data: { accountNumber, firstName, lastName, email, type, openingBalance },
        });
  },

  /**
  * function to delete bank account
  * @param {string} req
  * @param {string} res
  * @returns {object} returns an object
  */
  delete(req, res) {
    const { account } = req.body;

    AccountModel.delete(account);

    res.json({ status: 200, message: 'Account Deleted' });
  },

  /**
  * Function to change the account state of a user
  * @param {string} req
  * @param {string} res
  * @returns {object} returns an array of all accounts
  */
  changeState(req, res) {
    const { account } = req.body;

    const status = account.toggleState(); // for testing purposes;

    res.json({
      status: 200,
      data: { status, accountNumber: account.accountNumber },
    });
  },
};
