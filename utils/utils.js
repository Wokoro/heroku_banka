import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { request } from 'http';


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

const verifyToken = (req, res, next) => {
  const rawToken = req.headers.authorization || req.headers['x-access-token'] || request.body.token;
  const token = rawToken.split(' ')[1];
  const issureToken = jwt.verify(token, publicKey, verifyOptions);
  if (issureToken) {
    req.token = issureToken;
    next();
  } else {
    res.json({
      status: 400,
      message: 'Invalid token',
    });
  }
};

const hashPassword = password => bcrypt.hashSync(password, 10);

const verifyPassword = (password, hashedPassword) => verifyPassword(password, hashedPassword);

export {
  hashPassword, verifyPassword, generateToken, verifyToken,
};
