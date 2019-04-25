/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Single account tests Get /accounts/<account-number>/', () => {
  let accountnumber;
  let token;
  before(async () => {
    const loginDetails = {
      email: 'wokorosamuel@yahoo.com',
      password: 'password',
    };
    const params = {
      status: 'active',
      openingBalance: 23774664,
      type: 'savings',
    };
    try {
      const loggedInUser = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
      token = loggedInUser.body.data.token;
      token = `Bearer ${token}`;
      const newAccount = await chai.request(server).post('/api/v1/accounts').set('Authorization', token).send(params);
      accountnumber = newAccount.body.data.accountnumber;
    } catch (error) {
      console.log(error);
    }
  });
  describe('tests for successful return of single account', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      try {
        res = await chai.request(server).get(`/api/v1/accounts/${accountnumber}`).set('Authorization', token).send();
      } catch (err) {
        console.log(err);
      }
    });
    it('Status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Response must contain transaction', () => {
      expect(res.body.data).to.have.property('account');
    });
  });
  describe('tests for unsuccessful return of single transaction', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      res = await chai.request(server).get('/api/v1/accounts/2323').set('Authorization', token).send();
    });
    it('Status 400', () => {
      expect(res.body).to.have.status(400);
    });
    it('Response must contain transaction', () => {
      expect(res.body).to.have.property('message');
    });
  });
});
