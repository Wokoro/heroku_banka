/* eslint-disable no-unused-expressions */
const { generateToken } = require('../../utils/utils');
const User = require('../models/user.model');


module.exports = {
  create(req, res) {
    const { body } = req;
    if (body.lastName && body.firstName && body.email && (body.password === body.confirmPassword)) {
      const user = new User(
        body.lastName, body.firstName, body.email,
        body.password, body.phoneNumber, body.type, false,
      );
      User.save(user.email, user);
      const { id } = user;
      res.send({
        status: 200,
        data: {
          id,
          token: generateToken({
            id, email: user.email, type: user.isAdmin, firstName: user.firstName, lastName: user.lastName,
          }, user.email),
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phoneNumber: body.phoneNumber,
        },
      });
    } else if (!body.lastName || !body.firstName || !body.email) {
      res.send({
        status: 401,
        message: 'required fields are empty',
      });
    } else {
      res.send({
        status: 401,
        message: 'confirmPassword and password fields do not match',
      });
    }
  },
  signin(req, res) {
    const { user } = res;
    res.send({
      status: 200,
      data: {
        token: generateToken({ id: user.id, email: user.email }, user.email),
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    });
  },
};
