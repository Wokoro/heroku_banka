/* eslint-disable no-useless-computed-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */

class Transaction {
  constructor(type, amount, cashier, oldBalance, accountNumber, newBalance) {
    this.id = ++Transaction.currentIdCount;
    this.createdOn = new Date();
    this.accountNumber = accountNumber;
    this.type = type;
    this.cashier = cashier;
    this.amount = amount;
    this.oldBalance = oldBalance;
    this.newBalance = newBalance;
  }

  getId() {
    return this.id;
  }

  static save(key, val) {
    Object.assign(Transaction.store, {
      [key]: val,
    });
  }

  static getTransaction(id) {
    return Transaction.store[id] ? Transaction.store[id] : false;
  }

  static getTransactions() {
    return Transaction.store;
  }
}

Transaction.store = {
  ['1']: {
    id: 3,
    createdOn: '2019-04-11T18:17:21.622Z',
    owner: 4,
    accountNumber: 18758432889,
    type: 'savings',
    status: 'domant',
    balance: '20000',
  },
};
Transaction.currentIdCount = 2;

module.exports = Transaction;
