/* eslint-disable no-else-return */
import UserModel from '../src/models/user.model';

export default async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserModel.find('email', email);
    if (!user[0]) {
      return next();
    }
    return res.json({
      status: 409,
      message: `${email} already exist`,
    });
  } catch (err) {
    return res.json({
      message: `An error occured: ${err}`,
    });
  }
};
