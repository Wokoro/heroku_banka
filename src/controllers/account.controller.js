/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable no-unused-expressions */

import AccountModel from '../models/account.model';
import UserModel from '../models/user.model';

export default {
  /**
  * Gets all bank accounts created
  * @param {string} req
  * @param {string} res
  * @returns {object} returns all accounts
  */
  async index(req, res) {
    try {
      const accounts = await AccountModel.all();

      if (!(accounts.length === 0)) {
        return res.json({ message: 'Operation successful', status: 200, accounts });
      }
      return res.json({ status: 400, message: 'No accounts created' });
    } catch (error) {
      return res.json({ status: 500, message: `An error occured. ${error}` });
    }
  },

  /**
* Function to get a specific transaction
* @param {string} req
* @param {string} res
* @returns {object} returns the transaction details if succesful
*/
  async show(req, res) {
    const { accountNumber } = req.params;
    try {
      const account = await AccountModel.find('accountnumber', accountNumber);
      res.json({ status: 200, data: { account: account[0] } });
    } catch (error) {
      res.json({ status: 500, message: `An error occured. ${error}` });
    }
  },

  /**
  * function to create bank account
  * @param {string} req
  * @param {string} res
  * @returns {object} returns a response object
  */
  async create(req, res) {
    const { id, email } = req.body.token;
    const { type, status, openingBalance } = req.body;
    try {
      const { accountnumber } = await AccountModel.create(id, type, status, openingBalance);
      const result = await UserModel.find('id', id);
      const { firstname, lastname } = result[0];
      res.json({
        message: 'Account Created',
        status: 200,
        data: { accountnumber, firstname, lastname, email, type, openingBalance },
      });
    } catch (err) {
      res.json({
        status: 500,
        message: `Unable to create account. ${err}`,
      });
    }
  },

  /**
  * function to delete bank account
  * @param {string} req
  * @param {string} res
  * @returns {object} returns an object
  */
  async delete(req, res) {
    const { accountNumber } = req.params;
    try {
     await AccountModel.delete(accountNumber);
      res.json({ status: 200, message: 'Account Deleted' });
    } catch (err) {
      res.json({ status: 400, message: `Unable to Deleted account ${err}` });
    }
  },

  /**
  * Function to change the account state of a user
  * @param {string} req
  * @param {string} res
  * @returns {object} returns an array of all accounts
  */
  async changeStatus(req, res) {
    const { accountNumber } = req.params;
    try {
      const status = await AccountModel.changeStatus(accountNumber); // for testing purposes;
      res.json({ message: 'Account status changed',
      status: 200,
      data: { status, accountNumber } });
    } catch (err) {
      res.json({
        message: `An error occured. ${err}`,
        status: 500,
      });
    }
  },
};
