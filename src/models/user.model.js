/* eslint-disable class-methods-use-this */
/* eslint-disable padded-blocks */
/* eslint-disable quotes */
/* eslint-disable no-plusplus */
import { client } from '../../database/db';
import { generateToken, hashPassword } from '../../utils/utils';

class User {
  /**
  * Find a user my email
  * @param {string} email
  * @returns {User} User
  */
  static async findUser(column, value) {
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
  static async createUser(lastName, firstName, email, password, type, isAdmin, phoneNumber) {
    const query = `INSERT INTO users(lastname, firstname, email, password, type, isadmin, phonenumber) values($1, $2, $3, $4, $5, $6, $7) RETURNING id, lastname, firstname, email, type, isadmin, phonenumber`;
    const userPassword = hashPassword(password);
    const result = await client.query(query, [lastName, firstName, email,
      userPassword, type, isAdmin, phoneNumber]);
    const user = result.rows[0];
    user.token = generateToken({ id: user.id, email, isAdmin });

    return result;
  }
}

export default User;
