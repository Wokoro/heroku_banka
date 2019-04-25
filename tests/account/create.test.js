/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';
import AccountModel from '../../src/models/account.model';

const { expect } = chai;

chai.use(chaiHttp);
describe('Bank account creation tests: POST /accounts', () => {
  let token;
  before(async () => {
    const loginDetails = {
      email: 'wokorosamuel@yahoo.com',
      password: 'password',
    };
    try {
      const loggedInUser = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
      ({ token } = loggedInUser.body.data);
      token = `Bearer ${token}`;
    } catch (error) {
      console.log(error);
    }
  });
  describe('tests for successful account creation', () => {
    let res = {};
    before(async () => {
      const params = {
        status: 'active',
        openingBalance: 23774664,
        type: 'savings',
      };
      try {
        res = await chai.request(server).post('/api/v1/accounts').set('Authorization', token).send(params);
      } catch (err) {
        console.log(err);
      }
    });
    it('Status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Response must contain valid account number', () => {
      expect(res.body.data).to.have.property('accountnumber');
    });
    it('Response must contain valid firstName', () => {
      expect(res.body.data).to.have.property('firstname');
    });
    it('Response must contain a valid lastName', () => {
      expect(res.body.data).to.have.property('lastname');
    });
    it('Response must contain a valid email', () => {
      expect(res.body.data).to.have.property('email');
    });
    it('Response must contain account type', () => {
      expect(res.body.data).to.have.property('type');
    });
    it('Response must contain opening balance', () => {
      expect(res.body.data).to.have.property('openingBalance');
    });
    it('Bank account must be created', () => {
      expect(AccountModel.find('accountnumber', res.body.data.accountNumber)).to.not.be.undefined;
    });
  });
  describe('tests for unsuccessful account creation', () => {
    after(() => { server.close(); });
    let res = {};
    before(async () => {
      const params = { status: '', openingBalance: 0, type: '' };
      try {
        res = await chai.request(server).post('/api/v1/accounts').set('Authorization', token).send(params);
      } catch (err) {
        console.log(err);
      }
    });
    it('Status 400', () => {
      expect(res.body).to.have.status(400);
    });
    it('Response body should be defined', () => {
      expect(res.body).to.have.property('message');
    });
  });
});
