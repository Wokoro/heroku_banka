/* eslint-disable radix */
/* eslint-disable no-plusplus */
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

  /**
    * Returns account id
    * @returns {Integer} returns user id
    */
  getId() {
    return this.id;
  }

  /**
  * Get account balance
  * @returns {object} return user balance
  */
  getbalance() {
    return this.balance;
  }

  /**
  * Debit an account
  * @param {string} account
  * @returns {boolen} return new amount or false if balance is low
  */
  debit(account) {
    let balance = Number(this.balance);
    const debitAmt = Number(account);
    const value = balance < debitAmt ? false : balance -= debitAmt;
    if (value) {
      this.balance = balance.toString();
    }
    return this.balance;
  }

  /**
  * credit an account
  * @param {string} req
  * @returns {Integer} returns account balance
  */
  credit(val) {
    let balance = Number(this.balance);
    const debitAmt = Number(val);
    balance += debitAmt;
    this.balance = balance.toString();
    return this.balance;
  }

  /**
  * Changes account status
  * @returns {string} returns account status
  */
  toggleState() {
    this.status = this.status === 'active' ? 'domant' : 'active';
    return this.status;
  }

  /**
  * Save account to datastore
  * @param {Account} account
  */
  static save(account) {
    Account.store.add(account);
  }

  /**
  * Delete a given account from datastore
  * @param {string} val
  */
  static delete(account) {
    Account.store.delete(account);
  }

  /**
  * Find a given account number
  * @param {Integer} accountNumber
  * @returns {Account} returns matched account
  */
  static findByAccountNumber(accountNumber) {
    return Account.all().find(account => account.accountNumber === parseInt(accountNumber));
  }

  /**
  * Get all account account numbers
  * @returns {Array} returns all account numbers
  */
  static all() {
    return [...Account.store];
  }

  /**
  * Function to generete random account number
  * @returns {Integer}
  */
  static genAccountNumber() {
    return Math.floor(Math.random() * (9999999999 - 1111111111) + 9999999999);
  }
}

Account.index = 0;
Account.store = new Set();

Account.store.add(new Account(1, 'savings', 'active', 30000, 5748394867));
Account.store.add(new Account(2, 'debit', 'domant', 50000, 9483784738));
Account.store.add(new Account(3, 'savings', 'active', 4000, 8372659845));

export default Account;
