/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
const utils = require('../../utils/utils');

class User {
  constructor(lastName, firstName, email, password, phoneNumber, type, isAdmin) {
    this._id = ++User.currentIdCount;
    this._lastName = lastName;
    this._firstName = firstName;
    this._email = email;
    this._password = utils.hashPassword(password, User.save);
    this._phoneNumber = phoneNumber;
    this._type = type;
    this._phoneNumeber = phoneNumber;
    this._idAdmin = isAdmin;
  }

  get id() {
    return this._id;
  }

  static exits(id) {
    return !!User.store[id];
  }

  static save(key, val) {
    Object.assign(User.store, {
      [key]: { ...val },
    });
  }
}

User.store = {};
User.currentIdCount = 0;

module.exports = User;
