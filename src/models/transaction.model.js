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

  static findByTransactionID(id) {
    return Transaction.all().find(transaction => transaction.id === parseInt(id));
  }

  /**
  * Funtion to save transaction to dataStore
  * @param {Transaction} transaction
  * @param {Account} account
  */
  static save(transaction) {
    Transaction.store.push(transaction);
  }

  /**
  * Find a given transaction in the datastore
  * @param {Integer} id
  * @returns {Transaction} return the found transaction
  */
  static findById(id) {
    return Transaction.store.find(transaction => transaction.id === id);
  }

  /**
  * Save account to datastore
  * @param {Account} account
  * @returns {Transactions} returns all transactions
  */
  static all() {
    return Transaction.store;
  }
}


Transaction.store = [];
Transaction.index = 3;

// Initialize Transaction model
Transaction.store.push(new Transaction('debit', 4000, 1, 9000, 5748394867, 50000));
Transaction.store.push(new Transaction('credit', 3000, 2, 10000, 8372659845, 12000));
Transaction.store.push(new Transaction('debit', 4000, 3, 9000, 9483784738, 50000));


export default Transaction;
