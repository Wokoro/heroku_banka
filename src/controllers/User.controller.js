/* eslint-disable no-unused-expressions */
const Utils = require('../../utils/utils');
const User = require('../models/user.model');


module.exports = {
  create(req, res) {
    let body = {};
    body = req.body.email ? req.body : req.query;
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
          token: Utils.generateToken({ id, email: body.email }, body.email),
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
};
