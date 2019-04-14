import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../src/models/user.model';

const privateKey = process.env.PRI_KEY.replace(/\\n/g, '\n');
const publicKey = process.env.PUB_KEY.replace(/\\n/g, '\n');

const issuer = 'Authorization/Resource/BankaServer';
const subject = '';
const expiresIn = '48h';
const algorithm = 'RS256';

const signOptions = {
  issuer,
  subject,
  expiresIn,
  algorithm,
};

const verifyOptions = {
  issuer,
  subject,
  expiresIn,
  algorithm: [`[${algorithm}`],
};

const generateToken = payload => jwt.sign(payload, privateKey, signOptions);

const verifyToken = (req, res, next) => {
  const tokenAuth = req.headers.authorization;
  if (typeof tokenAuth === 'undefined') {
    res.json({
      status: 500,
      message: 'Access Denied, Authorization token required',
    });
  } else {
    const token = req.headers.authorization.split(' ')[1] || false;
    const issureToken = jwt.verify(token, publicKey, verifyOptions);
    if (issureToken) {
      req.token = issureToken;
      next();
    } else {
      res.json({
        status: 401,
        message: 'Invalid token',
      });
    }
  }
};

const hashPassword = password => bcrypt.hashSync(password, 10);

const verifyPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

const authenticate = (req, res, next) => {
  const { body } = req;
  const user = UserModel.findByEmail(body.email);

  const password = verifyPassword(body.password, user.password);
  if (user && password) {
    res.user = user;
    return next();
  }
  return res.send({
    status: 401,
    message: 'User name or password incorrect',
  });
};

export {
  authenticate, hashPassword, verifyPassword, generateToken, verifyToken,
};
