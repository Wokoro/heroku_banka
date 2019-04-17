import bcrypt from 'bcrypt';
import UserModel from '../src/models/user.model';

/**
 * validaets users password and email
 * @param {string} req,
 * @param {string} res,
 * @param {string} next
 */
export default function (req, res, next) {
  const { email, password } = req.body;

  const user = UserModel.findByEmail(email);

  const userPassword = user ? bcrypt.compareSync(password, user.password) : false;

  if (user && userPassword) {
    req.user = user;
    return next();
  }
  return res.send({ status: 400, message: 'User name or password incorrect' });
}
