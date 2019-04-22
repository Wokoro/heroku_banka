/* eslint-disable padded-blocks */
/* eslint-disable quotes */
/* eslint-disable no-plusplus */
import bcrypt from 'bcrypt';
import { DBClient } from '../../db';


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
User.save(new User('Douye', 'Samuel', 'samuell@yahoo.com', 'samuel', '09066027359', 'staff', true));
User.save(new User('Benjamin', 'Tariladou', 'benbizzy@yahoo.com', 'samuel', '09066027359', 'staff', true));
User.save(new User('Enebimo', 'Joan', 'wokorosamuel@yahoo.com', 'samuel', '09066027359', 'staff', true));

export default User;
