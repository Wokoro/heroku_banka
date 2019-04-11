const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');


const privateFilePath = path.join(__dirname, 'private.key');
const publicFilePath = path.join(__dirname, 'public.key');
const privateKey = fs.readFileSync(privateFilePath, 'utf8');
const publicKey = fs.readFileSync(publicFilePath, 'utf8');


const issuer = 'Authorization/Resource/BankaServer';
const subject = '';
const expiresIn = '12h';
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
  generateToken(payload, audience) {
    signOptions.audience = audience;
    return jwt.sign(payload, privateKey, signOptions);
  },
  verifyToken(token, audience) {
    verifyOptions.audience = audience;
    return jwt.verify(token, publicKey, verifyOptions);
  },
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },
  verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  },
};
