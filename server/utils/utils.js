import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const privateKey = process.env.PRI_KEY;


const generateToken = payload => jwt.sign(payload, privateKey);

const verifyToken = token => jwt.verify(token, privateKey);

const passToken = async (req, res, next) => {
  const rawToken = req.headers.authorization || req.headers['x-access-token'] || req.body.token;

  const token = rawToken.split(' ')[1];
  try {
    const issureToken = verifyToken(token);

    if (issureToken) {
      req.body.token = issureToken;
      next();
    } else {
      res.status(400).json({ status: 400, message: 'Invalid User token' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: `Server errror. ${error}` });
  }
};

/**
 * Checks if both confirm password and password fields match
 * @param {string} values
 * @returns {boolean}
 *
 */
const isEmpty = value => value === '' || typeof value === 'undefined';

/**
 * Trims a given input value
 * @param {string} values
 * @returns {String}
 *
 */
const trim = value => value.toString().trim();

/**
 * Hashes user password
 * @param {string} password
 * @returns {string}
 *
 */
const hashPassword = password => bcrypt.hashSync(password, 10);


/**
 * Checks if both confirm password and password fields match
 * @param {string} values
 * @returns {boolean}
 *
 */
const verifyPassword = (password, hashedPassword) => verifyPassword(password, hashedPassword);

export {
  hashPassword, verifyPassword, generateToken, passToken, verifyToken, isEmpty, trim,
};
