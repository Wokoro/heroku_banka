/* eslint-disable class-methods-use-this */
/* eslint-disable no-new */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');

class User {
  constructor(lastName, firstName, email, password, phoneNumber, type, isAdmin) {
    this.id = ++User.index;
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
    this.password = bcrypt.hashSync(password, 10);
    this.phoneNumber = phoneNumber;
    this.type = type;
    this.phoneNumeber = phoneNumber;
    this.isAdmin = isAdmin;
  }

  exits(email) {
    return !!User.all().find(user => user.email === email);
  }

  getPassword() {
    return this.password;
  }

  static findByEmail(email) {
    return User.all().find(user => user.email === email);
  }

  static findById(id) {
    return User.all().find(user => user.id === id);
  }

  static save(val) {
    User.store.add(val);
  }

  static all() {
    return [...User.store];
  }
}

User.index = 0;
User.store = new Set();

// User model mock data

export default User;
