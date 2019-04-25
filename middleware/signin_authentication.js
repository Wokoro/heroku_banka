/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt';
import UserModel from '../src/models/user.model';

/**
 * validaets users password and email
 * @param {string} req,
 * @param {string} res,
 * @param {string} next
 */
export default async function (req, res, next) {
  const { email, password } = req.body;
  try {
    const result = await UserModel.find('email', email);
    const user = result[0];
    const userPassword = user ? bcrypt.compareSync(password, user.password) : false;
    if (user && userPassword) {
      delete user.password;
      req.user = user;
      next();
    } else {
      res.json({ status: 400, message: 'User name or password incorrect' });
    }
  } catch (err) {
    res.json({ status: 500, message: 'An error has occured' });
    console.log(err);
  }
}
