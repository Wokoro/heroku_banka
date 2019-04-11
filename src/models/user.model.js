/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
const Utils = require('../../utils/utils');

class User {
  constructor(lastName, firstName, email, password, phoneNumber, type, isAdmin) {
    this.id = ++User.currentIdCount;
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
    this.password = Utils.hashPassword(password);
    this.phoneNumber = phoneNumber;
    this.type = type;
    this.phoneNumeber = phoneNumber;
    this.idAdmin = isAdmin;
  }

  getId() {
    return this.id;
  }

  getPassword() {
    return this.password;
  }

  static exits(email) {
    return !!User.store[email];
  }

  static save(key, val) {
    Object.assign(User.store, {
      [key]: { ...val },
    });
  }

  static getUser(email) {
    return User.store[email];
  }
}

User.store = {
  'douyesamuel@yahoo.com': {
    id: 1,
    status: 200,
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiZW5iaXp6eUBnbWFpbC5jb20iLCJpYXQiOjE1NTQ5MjQ5NzYsImV4cCI6MTU1NDk2ODE3NiwiYXVkIjoiYmVuYml6enlAZ21haWwuY29tIiwiaXNzIjoiQXV0aG9yaXphdGlvbi9SZXNvdXJjZS9CYW5rYVNlcnZlciIsInN1YiI6IiJ9.SUtVVzRv0AA5HLB4VesktYPwSxr3ohGv7zA10UoiPLWlpGFeaj_bcjeAXe4vfugk47yyn3qw8M-ETikvvs9ujQ',
    firstName: 'tariladou',
    lastName: 'benjamin',
    email: 'benbizzy@gmail.com',
    password: 'password',
    isAdmin: false,
    phoneNumber: '09066027359',
  },
  'wokorosamuel@yahoo.com': {
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3b2tvcm9zYW11ZWxAeWFob28uY29tIiwiaWF0IjoxNTU0OTMzOTI1LCJleHAiOjE1NTQ5NzcxMjUsImF1ZCI6Indva29yb3NhbXVlbEB5YWhvby5jb20iLCJpc3MiOiJBdXRob3JpemF0aW9uL1Jlc291cmNlL0JhbmthU2VydmVyIiwic3ViIjoiIn0.Na7S3h5IzsRbsg_iwFH_Luh5UDISZWXuGfdMq9SGKqeyunM4Z4iKtxwX0IuvuupTpu5PlG33ToH0ieOySSrQqQ',
    id: 2,
    firstName: 'douye',
    lastName: 'samuel',
    email: 'wokorosamuel@yahoo.com',
    password: '$2b$10$Vj4..ooBt7hN1BNVakMhRubM7p.ZiO0ZFANLfQ/hXk9yUYPAofHze',
    isAdmin: false,
    phoneNumber: '09066027359',
  },
};
User.currentIdCount = 2;

module.exports = User;
