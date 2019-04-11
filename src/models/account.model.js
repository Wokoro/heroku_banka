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

  static exits(accountNumber) {
    return !!Account.store[accountNumber];
  }

  static save(key, val) {
    Object.assign(Account.store, {
      [key]: { ...val },
    });
  }

  static getAccount(accountNumber) {
    return Account.store[accountNumber];
  }

  static genAccountNumber() {
    return Math.floor(Math.random() * (9999999999 - 1111111111) + 9999999999);
  }
}

Account.store = {
  ['12323443']: {
    id: 1,
    createdOn: '23/3/2019',
    owner: 1,
    type: 'savings',
    status: 'active',
    balance: '200000',
  },
  ['14352443']: {
    id: 2,
    createdOn: '23/3/2019',
    owner: 2,
    type: 'savings',
    status: 'active',
    balance: '200000',
  },
  ['12324354']: {
    id: 3,
    createdOn: '22/5/2019',
    owner: 3,
    type: 'savings',
    status: 'active',
    balance: '200000',
  },
};
Account.currentIdCount = 2;

module.exports = Account;
