import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const privateKey = '-----BEGIN RSA PRIVATE KEY-----\nMIIBOgIBAAJAXvAed31PLxc6rb5LOaP9CW14reZUG8C50WnpvDPi/xGeYq0kRuiY\nIOUQ1PRKPC+q21gWuOsFz/qaSweddsLsAQIDAQABAkBcFHC4XCWM+u7CzSqRAWjO\n2AqQQDGbqVWQszUsgPbNhM6IDV2wczZ0bIlehV0ha4hxHBvD97+YP0x1hsl14u7x\nAiEAobYKAPry4oFRTHge23FrHBSp/IeQ4XzjR1rrdfOlVjMCIQCWSyAYG/cZbLkJ\nq6nwGALpOtAjgQArs+5nAeHPFUL4+wIgOffsrB9JVCLxRs1EmnuU3tMVgH4EVKCV\nRK31/ClkGnsCIQCM9bsNQbVZMELAUjQZzrt0Okga9JPPaXwROo+qZRuiXwIhAIa0\nuTq88tjst8dmsUfHICBHlcXT3IyX60HNn67G2wL5\n-----END RSA PRIVATE KEY-----'.replace(/\\n/g, '\n');
const publicKey = '-----BEGIN PUBLIC KEY-----\nMFswDQYJKoZIhvcNAQEBBQADSgAwRwJAXvAed31PLxc6rb5LOaP9CW14reZUG8C5\n0WnpvDPi/xGeYq0kRuiYIOUQ1PRKPC+q21gWuOsFz/qaSweddsLsAQIDAQAB\n-----END PUBLIC KEY-----'.replace(/\\n/g, '\n');


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
