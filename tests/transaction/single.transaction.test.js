/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Single transaction tests Get /transaction/<transaction-number>/', () => {
  const token = process.env.TEST_TOKEN;
  describe('tests for successful return of single transaction', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      res = await chai.request(server).get('/api/v1/transactions/5').set('Authorization', token).send();
    });
    it('Status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Response must contain transaction', () => {
      expect(res.body.data).to.have.property('transaction');
    });
  });
  describe('tests for unsuccessful return of single transaction', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      res = await chai.request(server).get('/api/v1/transactions/5748394867').set('Authorization', token).send();
    });
    it('Status 400', () => {
      expect(res.body).to.have.status(400);
    });
    it('Response must contain transaction', () => {
      expect(res.body).to.have.property('message');
    });
  });
});
