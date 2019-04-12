/* eslint-disable no-unused-expressions */
import { generateToken } from '../../utils/utils';

import User from '../models/user.model';


export default {
  create(req, res) {
    const { body } = req;
    if (body.lastName && body.firstName && body.email && (body.password === body.confirmPassword)) {
      const user = new User(
        body.lastName, body.firstName, body.email,
        body.password, body.phoneNumber, body.type, body.isAdmin,

      );
      User.save(user);
      const { id } = user;
      const token = generateToken({
        id,
        email: user.email,
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      res.send({
        status: 200,
        data: {
          id,
          token,
          idAdmin: user.isAdmin,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
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
