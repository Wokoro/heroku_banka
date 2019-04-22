/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Single account tests Get /accounts/<account-number>/', () => {
  const token = process.env.TEST_TOKEN;
  describe('tests for successful return of single account', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      res = await chai.request(server).get('/api/v1/accounts/5748394867').set('Authorization', token).send();
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
