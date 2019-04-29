/* eslint-disable no-else-return */
import UserModel from '../src/models/user.model';

export default async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findUser('email', email);
    if (!user[0]) {
      return next();
    }
    return res.status(409).send({
      status: 409,
      message: `${email} already exist`,
    });
  } catch (err) {
    return res.send({
      message: `An error occured: ${err}`,
    });
  }
};
