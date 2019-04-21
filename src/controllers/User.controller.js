/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import { generateToken } from '../../utils/utils';

import User from '../models/user.model';


export default {
/**
 * Creates user account
 * @param {string} req
 * @param {string} res
 * @returns {object} object containing status code and created user details
 */
  create(req, res) {
    const { lastName, firstName, email, password, phoneNumber, type, isAdmin } = req.body;
    const user = new User(lastName, firstName, email, password, phoneNumber, type, isAdmin);
    const { id } = user;

    User.save(user);

    const token = generateToken({ id, email, isAdmin });

    return res.json({
      status: 200,
      data: { id, token, isAdmin, firstName, lastName, email, phoneNumber },
    });
  },

  /**
  * Signin a given user
  * @param {string} req
  * @param {string} res
  * @returns {object} object containing status code and signedup user
  */
  signin(req, res) {
    const { id, email, firstName, lastName, password } = req.user;

    return res.json({
      status: 200,
      data: {
        token: generateToken({ id, email }, email),
        id,
        firstName,
        lastName,
        email,
        password,
      },
    });
  },
};
