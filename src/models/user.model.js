/* eslint-disable no-plusplus */
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

  /**
  * Returns a users password
  * @returns {User} User
  */
  getPassword() {
    return this.password;
  }

  /**
  * Find a user my email
  * @param {string} email
  * @returns {User} User
  */
  static findByEmail(email) {
    return User.all().find(user => user.email === email);
  }

  /**
  * Store a given user to datastore
  * @param {User} user
  * @returns {User} User
  */
  static save(user) {
    User.store.add(user);
  }

  /**
  * Get all users
  * @returns {Array} Users
  */
  static all() {
    return [...User.store];
  }
}

User.index = 0;
User.store = new Set();

export default User;
