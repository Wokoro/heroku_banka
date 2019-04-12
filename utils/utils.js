const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const UserModel = require('../src/models/user.model');


const privateFilePath = path.join(__dirname, 'private.key');
const publicFilePath = path.join(__dirname, 'public.key');
const privateKey = fs.readFileSync(privateFilePath, 'utf8');
const publicKey = fs.readFileSync(publicFilePath, 'utf8');


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
module.exports = {
  generateToken(payload) {
    return jwt.sign(payload, privateKey, signOptions);
  },
  verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
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
  },
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },
  verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  },
  authenticate(req, res, next) {
    const { body } = req;
    const user = UserModel.findByEmail(body.email);

    const password = user ? bcrypt.compareSync(body.password, user.password) : false;
    if (user && password) {
      res.user = user;
      next();
    } else {
      res.send({
        status: 401,
        message: 'User name or password incorrect',
      });
    }
  },
};
