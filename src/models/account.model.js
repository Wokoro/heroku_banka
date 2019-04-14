/* eslint-disable no-new */
/* eslint-disable radix */
/* eslint-disable no-useless-computed-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */

class Account {
  constructor(owner, type, status, balance, accountNumber) {
    this.id = ++Account.index;
    this.createdOn = new Date();
    this.owner = owner;
    this.accountNumber = typeof accountNumber === 'undefined' ? Account.genAccountNumber() : accountNumber;
    this.type = type;
    this.status = status;
    this.balance = balance;
  }

  getId() {
    return this.id;
  }

  getbalance() {
    return this.balance;
  }

  debit(val) {
    let balance = Number(this.balance);
    const debitAmt = Number(val);
    const value = balance < debitAmt ? false : balance -= debitAmt;
    if (value) {
      this.balance = balance.toString();
    }
    return value;
  }

  credit(val) {
    let balance = Number(this.balance);
    const debitAmt = Number(val);
    balance += debitAmt;
    this.balance = balance.toString();
    return balance;
  }

  toggleState() {
    this.status = this.status === 'active' ? 'domant' : 'active';
    return this.status;
  }

  static save(val) {
    Account.store.add(val);
  }

  static delete(val) {
    Account.store.delete(val);
  }

  static findByAccountNumber(accountNumber) {
    return Account.all().find(account => account.accountNumber === parseInt(accountNumber));
  }

  static all() {
    return [...Account.store];
  }

  static genAccountNumber() {
    return Math.floor(Math.random() * (9999999999 - 1111111111) + 9999999999);
  }
}

Account.index = 0;
Account.store = new Set();
Account.store.add(new Account(1, 'active', 'savings', 30000, 5748394867));
Account.store.add(new Account(2, 'domant', 'debit', 50000, 9483784738));
Account.store.add(new Account(3, 'active', 'savings', 4000, 8372659845));

export default Account;
