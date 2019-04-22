/* eslint-disable no-else-return */
import UserModel from '../src/models/user.model';

export default (req, res, next) => {
  const { email } = req.body;
  const user = UserModel.findByEmail(email);
  if (user) {
    res.json({
      status: 409,
      message: `${email} already exist`,
    });
  } else {
    next();
  }
};
