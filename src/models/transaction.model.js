import { client } from '../../database/db';

/* eslint-disable radix */
/* eslint-disable no-new */
/* eslint-disable no-useless-computed-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */

class Transaction {
  constructor(type, amount, cashier, oldBalance, accountNumber, newBalance) {
    this.id = ++Transaction.index;
    this.createdOn = new Date();
    this.accountNumber = accountNumber;
    this.type = type;
    this.cashier = cashier;
    this.amount = amount;
    this.oldBalance = oldBalance;
    this.newBalance = newBalance;
  }

  static async create(type, amount, cashierID, oldBalance, newBalance, accountNumber) {
    const createdOn = new Date();
    const query1 = `INSERT INTO transactions(type, amount, cashier, oldbalance, newbalance, createdon, accountnumber) 
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const query2 = `UPDATE accounts SET balance = ${newBalance} WHERE accountnumber=${accountNumber}`;
    client.query(query2);
    const result = await client.query(query1, [type, amount, cashierID, oldBalance, newBalance, createdOn, accountNumber]);

    return result.rows[0];
  }

  /**
  * Find a given transaction in the datastore
  * @param {Integer} id
  * @returns {Transaction} return the found transaction
  */
  static async find(column, value) {
    const query = `SELECT * FROM transactions WHERE  ${column} = ${value}`;
    const result = await client.query(query);
    return result.rows;
  }

  /**
  * Save account to datastore
  * @param {Account} account
  * @returns {Transactions} returns all transactions
  */
  static async all() {
    const query = 'SELECT * FROM transactions';
    const result = await client.query(query);
    return result.rows;
  }
}


Transaction.store = [];
Transaction.index = 3;

// Initialize Transaction model
Transaction.store.push(new Transaction('debit', 4000, 1, 9000, 5748394867, 50000));
Transaction.store.push(new Transaction('credit', 3000, 2, 10000, 8372659845, 12000));
Transaction.store.push(new Transaction('debit', 4000, 3, 9000, 9483784738, 50000));


export default Transaction;
