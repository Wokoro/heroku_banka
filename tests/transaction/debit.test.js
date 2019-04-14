/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Debit transaction tests POST /transaction/<account-number>/debit', () => {
  const token = process.env.TEST_TOKEN;
  describe('tests for successful debit operation', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      res = await chai.request(server).post('/api/v1/transactions/5748394867/debit').set('Authorization', token).send({ amount: 200 });
    });
    it('Status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Response must contain transaction ID', () => {
      expect(res.body.data).to.have.property('id');
    });
    it('Response must contain account number', () => {
      expect(res.body.data).to.have.property('accountNumber');
    });
    it('Response must contain new balance', () => {
      expect(res.body.data).to.have.property('newBalance');
    });
    it('Response must contain old balance', () => {
      expect(res.body.data).to.have.property('oldBalance');
    });
    it('Response must contain cashier id', () => {
      expect(res.body.data).to.have.property('cashier');
    });
    it('Response must contain transaction type', () => {
      expect(res.body.data).to.have.property('type');
    });
    it('Response must contain account amount', () => {
      expect(res.body.data).to.have.property('amount');
    });
    it('Account balance should increase', () => {
      expect(res.body.data.newBalance < res.body.data.oldBalance).to.be.true;
    });
  });
});
