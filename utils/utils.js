import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../src/models/user.model';


const privateKey = process.env.PRI_KEY.replace(/\\n/g, '\n');
const publicKey = process.env.PUB_KEY.replace(/\\n/g, '\n');


const issuer = 'Authorization/Resource/BankaServer';
const subject = '';
const algorithm = 'RS256';

const signOptions = {
  issuer,
  subject,
  algorithm,
};

const verifyOptions = {
  issuer,
  subject,
  algorithm: [`[${algorithm}`],
};

const generateToken = payload => jwt.sign(payload, privateKey, signOptions);

const verifyToken = token => jwt.verify(token, publicKey, verifyOptions);

const passToken = async (req, res, next) => {
  const rawToken = req.headers.authorization || req.headers['x-access-token'] || req.body.token;
  const token = rawToken.split(' ')[1];
  try {
    const issureToken = verifyToken(token);
    if (issureToken) {
      req.body.token = issureToken;
      next();
    } else {
      res.json({ status: 400, message: 'Invalid token' });
    }
  } catch (error) {
    res.json({ status: 500, message: `An error occured. ${error}` });
  }
};

/**
 * Checks if both confirm password and password fields match
 * @param {string} values
 * @returns {boolean}
 *
 */
function isEmpty(value) {
  return value === '' || typeof value === 'undefined';
}

/**
 * Trims a given input value
 * @param {string} values
 * @returns {String}
 *
 */
function trim(value) {
  return value.toString().trim();
}

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
