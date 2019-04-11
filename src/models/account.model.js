/* eslint-disable no-useless-computed-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */

class Account {
  constructor(owner, type, status, balance) {
    this.id = ++Account.currentIdCount;
    this.createdOn = new Date();
    this.owner = owner;
    this.accountNumber = Account.genAccountNumber();
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

  toggleState() {
    this.status = this.status === 'active' ? 'domant' : 'active';
    return this.status;
  }

  static exits(accountNumber) {
    return !!Account.store[accountNumber];
  }

  static save(key, val) {
    Object.assign(Account.store, {
      [key]: val,
    });
    return Account.store;
  }

  static getAccount(accountNumber) {
    return Account.store[accountNumber] ? Account.store[accountNumber] : false;
  }

  static getAccounts() {
    return Account.store;
  }

  static genAccountNumber() {
    return Math.floor(Math.random() * (9999999999 - 1111111111) + 9999999999);
  }
}

Account.store = {
  ['10650895136']: {
    id: 3,
    createdOn: '2019-04-11T18:17:21.622Z',
    owner: 4,
    accountNumber: 18758432889,
    type: 'savings',
    status: 'domant',
    balance: '20000',
  },
};
Account.currentIdCount = 2;

module.exports = Account;
