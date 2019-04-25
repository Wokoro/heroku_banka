/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import { generateToken } from '../../utils/utils';
import UserModel from '../models/user.model';
import AccountModel from '../models/account.model';


export default {
/**
 * Creates user account
 * @param {string} req
 * @param {string} res
 * @returns {object} object containing status code and created user details
 */
  async create(req, res) {
    const { lastName, firstName, email, password, phoneNumber, type, isAdmin } = req.body;

    try {
      const result = await UserModel.create(lastName, firstName, email, password, type, isAdmin, phoneNumber);
      const user = result.rows[0];
      const { id } = user;
      user.token = generateToken({ id, email }, email);
      res.json({ status: 200, data: user });
    } catch (err) {
      res.json({ status: 500, message: err });
    }
  },

  /**
  * Signin a given user
  * @param {string} req
  * @param {string} res
  * @returns {object} object containing status code and signedup user
  */
  signin(req, res) {
    const { id, email, firstname, lastname, password } = req.user;

    return res.json({
      status: 200,
      data: {
        token: generateToken({ id, email }, email),
        id,
        firstname,
        lastname,
        email,
        password,
      },
    });
  },

  /**
 * Display all user account(s)
 * @param {string} req
 * @param {string} res
 * @returns {object} object containing status code and user account(s) if successful
 */
  async accounts(req, res) {
    const { userEmailAddress } = req.params;
    try {
      const { accountnumber } = await UserModel.find('email', userEmailAddress);
      const userAccounts = await AccountModel.find('accountnumber', accountnumber);
      res.json({ status: 200, data: userAccounts });
    } catch (err) {
      res.json({ status: 500, message: err });
    }
  },
};
