/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
import { client } from '../../database/db';

class Account {
  /**
  * Debit an account
  * @param {string} account
  * @returns {boolen} return new amount or false if balance is low
  */

  static async debitAccount(amount) {
    const { accountNumber } = account;
    const account = await Account.findAccount('accountnumber', accountNumber);
    let { balance } = account;
    const debitAmt = Number(amount);
    balance -= debitAmt;
    const query = `UPDATE accounts SET accountbalance = ${balance} WHERE accountnumber = ${accountNumber}`;
    return client.query(query)
      .then(result => result.rows[0]);
  }

  /**
  * Create an account
  * @param {string} account number
  * @returns {boolen} return new amount or false if balance is low
  */
  static async createAccount(ownerID, type, status, balance) {
    const accountNumber = Account.genAccountNumber();
    const createdOn = new Date();
    const query = `INSERT INTO accounts(accountnumber, createdon, status, userid, type, balance) 
    values($1, $2, $3, $4, $5, $6)
    RETURNING accountnumber`;
    const result = await client.query(query, [accountNumber, createdOn, status, ownerID, type, balance]);
    return result.rows[0];
  }

  /**
  * credit an account
  * @param {string} req
  * @returns {Integer} returns account balance
  */
  static async creditAccount(amount) {
    const { accountNumber } = account;
    const account = await Account.findAccount('accountnumber', accountNumber);
    let { balance } = account;
    const debitAmt = Number(amount);
    balance += debitAmt;
    const query = `UPDATE accounts SET accountbalance = ${balance} WHERE accountnumber = ${accountNumber}`;
    const result = await client.query(query);
    return result.rows[0];
  }

  /**
  * Changes account status
  * @returns {string} returns account status
  */
  static async changeStatus(accountNumber) {
    const response = await Account.findAccount('accountnumber', accountNumber);
    const { status } = response[0];
    const newStatus = status === 'active' ? 'domant' : 'active';
    const query = `UPDATE accounts SET status = '${newStatus}' WHERE accountnumber = ${accountNumber} RETURNING status`;
    const result = await client.query(query);
    return result.rows[0].status;
  }

  /**
  * Delete a given account from datastore
  * @param {string} val
  */
  static async delete(accountnumber) {
    const query = `DELETE FROM accounts WHERE accountNumber = ${accountnumber}`;
    const result = await client.query(query);
    return result;
  }

  /**
  * Find a given account number
  * @param {Integer} accountNumber
  * @returns {Account} returns matched account
  */
  static async findAccount(column, value) {
    const query = `SELECT * FROM accounts WHERE ${column} = '${value}'`;
    const result = await client.query(query);
    return result.rows;
  }

  /**
  * Get all account account numbers
  * @returns {Array} returns all account numbers
  */
  static async getAllAccounts() {
    const query = 'SELECT * FROM accounts';
    const result = await client.query(query);
    return result.rows;
  }

  /**
  * Function to generete random account number
  * @returns {Integer}
  */
  static genAccountNumber() {
    return Math.floor(Math.random() * (999999999 - 111111111) + 999999999);
  }
}

export default Account;
