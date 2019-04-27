/* eslint-disable class-methods-use-this */
import { client } from '../../database/db';

/* eslint-disable radix */
/* eslint-disable no-new */
/* eslint-disable no-useless-computed-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */

class Transaction {
  /**
  * Create transaction
  * @param {String} type
  * @param {Integer} amount
  * @param {Integer} cashierID
  * @param {Integer} oldBalance
  * @param {Integer} newBalance
  * @param {Integer} accountNumber
  * @returns {Transaction} return the details of trasaction
  */
  static async createTransaction(type, amount, cashierID, oldBalance, newBalance, accountNumber) {
    const createdOn = new Date();
    const query1 = `INSERT INTO transactions(type, amount, cashier, oldbalance, newbalance, createdon, accountnumber) 
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const query2 = 'UPDATE accounts SET balance = $1 WHERE accountnumber=$2';
    client.query(query2, [newBalance, accountNumber]);
    const result = await client.query(query1, [type, amount, cashierID, oldBalance, newBalance, createdOn, accountNumber]);
    return result.rows[0];
  }

  /**
  * Find a given transaction in the datastore
  * @param {Integer} id
  * @returns {Transaction} return the found transaction
  */
  static async findTransaction(column, value) {
    const query = `SELECT * FROM transactions WHERE  ${column} = $1`;
    const result = await client.query(query, [value]);
    return result.rows;
  }

  /**
  * Save account to datastore
  * @param {Account} account
  * @returns {Transactions} returns all transactions
  */
  static async getAllTransactions() {
    const query = 'SELECT * FROM transactions';
    const result = await client.query(query);
    return result.rows;
  }
}

export default Transaction;
