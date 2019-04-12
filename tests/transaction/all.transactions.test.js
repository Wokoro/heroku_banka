/* eslint-disable no-unused-expressions */
const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('Tests for getting all transactions: PATCH /account/<account-number>', () => {
  const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ3b2tvcm9zYW11ZWxAeWFob28uY29tIiwiaXNBZG1pbiI6InRydWUiLCJmaXJzdE5hbWUiOiJzYW11ZWwiLCJsYXN0TmFtZSI6ImRvdXllIiwiaWF0IjoxNTU1MDQ4MzkzLCJleHAiOjE1NTUyMjExOTMsImlzcyI6IkF1dGhvcml6YXRpb24vUmVzb3VyY2UvQmFua2FTZXJ2ZXIiLCJzdWIiOiIifQ.S-d7og-kaTFHR3GSlwUzQqs-vJRjCaE_g6PRVE9GGiTeG1-Umqs-8q5dZzH3hq2A1ns0L5-3Iw4r4p6QSLH-iQ';
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
