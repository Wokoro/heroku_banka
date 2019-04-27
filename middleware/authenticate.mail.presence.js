import UserModel from '../src/models/user.model';

export default async (req, res, next) => {
  const { userEmailAddress } = req.params;
  const { email } = req.body.token;
  const EMAIL_FIELD_REG = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  try {
    if (EMAIL_FIELD_REG.test(userEmailAddress)) {
      const user1 = await UserModel.findUser('email', userEmailAddress);
      const user2 = await UserModel.findUser('email', email);
      if (!!user1[0] && !!user2[0]) {
        return next();
      } if (!user1[0]) {
        return res.json({
          status: 400,
          message: `Resquested account ${userEmailAddress} does not exists`,
        });
      }
      return res.json({
        status: 400,
        message: `${email} do not exist please signup`,
      });
    }
    return res.json({
      status: 400,
      message: 'Invalid user email',
    });
  } catch (error) {
    res.json({ status: 500, message: `An error occured. ${error}` });
  }
};
