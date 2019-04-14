/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Tests for getting all transactions: PATCH /account/<account-number>', () => {
  const token = process.env.TEST_TOKEN;
  describe('successful return of accounts', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      res = await chai.request(server).get('/api/v1/transactions').set('Authorization', token).send();
    });
    it('Status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Must return all accounts', () => {
      expect(res.body).to.have.property('transactions');
    });
  });
});
