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
  async createUser(req, res) {
    try {
      const { lastName, firstName, email, password, phoneNumber, type, isAdmin } = req.body;

      const savedUsers = await UserModel.findUser('email', email);
      if (savedUsers.length !== 0) return res.status(409).json({
        message: 'User already Exist',
        status: 409,
        data: 'User already exists'
      });

      const result = await UserModel.createUser(lastName, firstName, email, password, type, isAdmin, phoneNumber);
      const user = { lastName, firstName, email, password, phoneNumber, type, isAdmin };

      user.token = generateToken({ email }, email);

      // send email to {email} specified 
      res.status(200).json({ message: 'Signup successfully', status: 200, data: user });
    } catch (err) {

      res.status(500).json({ status: 500, message: `An error occured. ${err}` });
    }
  },

  /**
  * Signin a given user
  * @param {string} req
  * @param {string} res
  * @returns {object} object containing status code and signedup user
  */
  signinUser(req, res) {
    const { id, email, firstname, lastname, password } = req.user;

    return res.status(200).json({
      message: 'User signed in',
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
  async getAllUserAccounts(req, res) {
    const { userEmailAddress } = req.params;
    try {
      const result = await UserModel.findUser('email', userEmailAddress);
      const { id } = await result[0];
      const userAccounts = await AccountModel.findAccount('userid', id);
      if (userAccounts.length === 0) {
        return res.status(400).json({ status: 400, message: 'No accounts created' });
      }
      return res.status(200).json({ status: 200, data: { accounts: userAccounts } });
    } catch (err) {
      return res.status(500).json({ status: 500, message: `An error occured. ${err}` });
    }
  },
};
