/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';
import AccountModel from '../../src/models/account.model';

const { expect } = chai;

chai.use(chaiHttp);
describe('Bank account creation tests: POST /accounts', () => {
  const token = process.env.TEST_TOKEN;
  describe('tests for successful account creation', () => {
    let res = {};
    before(async () => {
      const params = {
        status: 'active',
        openingBalance: 23774664,
        type: 'savings',
      };
      res = await chai.request(server).post('/api/v1/accounts').set('Authorization', token).send(params);
    });
    it('Status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Response must contain valid account number', () => {
      expect(res.body.data).to.have.property('accountNumber');
    });
    it('Response must contain valid firstName', () => {
      expect(res.body.data).to.have.property('firstName');
    });
    it('Response must contain a valid lastName', () => {
      expect(res.body.data).to.have.property('lastName');
    });
    it('Response must contain a valid email', () => {
      expect(res.body.data).to.have.property('email');
      expect(res.body.data.email).to.match(/^([A-Za-z0-9_\-.])+@([A-Za-z])+\.([A-Za-z])/);
    });
    it('Response must contain account type', () => {
      expect(res.body.data).to.have.property('type');
    });
    it('Response must contain opening balance', () => {
      expect(res.body.data).to.have.property('openingBalance');
    });
    it('Bank account must be created', () => {
      expect(AccountModel.findByAccountNumber(res.body.data.accountNumber)).to.not.be.undefined;
    });
  });
  describe('tests for unsuccessful account creation', () => {
    after(() => { server.close(); });
    let res = {};
    before(async () => {
      const params = {
        password: '',
        openingBalance: '',
        type: '',
      };
      res = await chai.request(server).post('/api/v1/accounts').set('Authorization', token).send(params);
    });
    it('Status 400', () => {
      expect(res.body).to.have.status(400);
    });
    it('Response body should be defined', () => {
      expect(res.body).to.have.property('message');
    });
  });
});
