/* eslint-disable padded-blocks */
/* eslint-disable quotes */
/* eslint-disable no-plusplus */
import bcrypt from 'bcrypt';
import { client } from '../../database/db';
import { generateToken, hashPassword } from '../../utils/utils';

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
  static async find(column, value) {
    const query = `SELECT * FROM users WHERE ${column} = '${value}'`;
    const result = await client.query(query);
    const userRows = await result.rows;
    return userRows;
  }

  /**
   *  Create and save a given user in the database
   *  @params{string} lastName
   *  @params{string} firstName
   *  @params{string} email
   *  @params{string} password
   *  @params{string} type
   *  @params{boolean} isAdmin
   *  @params{string} phoneNumber
   *
   * @returns {Promise}
   */
  static async create(lastName, firstName, email, password, type, isAdmin, phoneNumber) {
    const query = `INSERT INTO users(lastname, firstname, email, password, type, isadmin, phonenumber) values($1, $2, $3, $4, $5, $6, $7) RETURNING id, lastname, firstname, email, type, isadmin, phonenumber`;
    const userPassword = hashPassword(password);
    const result = await client.query(query, [lastName, firstName, email, userPassword, type, isAdmin, phoneNumber]);
    result.token = generateToken({ id: result.id, email, isAdmin });
    return result;
  }

  /**
  * Get all users
  * @returns {Array} Users
  */
  static async all() {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  }
}

export default User;
