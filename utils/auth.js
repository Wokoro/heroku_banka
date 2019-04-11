const UserModel = require('../src/models/user.model');
const Utils = require('../utils/utils');

module.exports = {
  authenticate(req, res) {
    let body = {};
    body = req.body.email ? req.body : req.query;

    const user = UserModel.getUser(body.email);

    // const password = Utils.verifyPassword(req.body.password, user.password);
    const password = user ? Utils.verifyPassword(body.password, user.password) : false;

    if (user && password) {
      res.send({
        status: 200,
        data: {
          token: Utils.generateToken({ id: user.id, email: user.email }, user.email),
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        },
      });
    } else {
      res.send({
        status: 401,
        message: 'User name or password incorrect',
      });
    }
  },
};
