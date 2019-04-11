/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */
const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('Credit transaction tests POST /transaction/<account-number>/credit', () => {
  const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ3b2tvcm9zYW11ZWxAeWFob28uY29tIiwiaXNBZG1pbiI6InRydWUiLCJmaXJzdE5hbWUiOiJzYW11ZWwiLCJsYXN0TmFtZSI6ImRvdXllIiwiaWF0IjoxNTU1MDA0ODc4LCJleHAiOjE1NTUwNDgwNzgsImlzcyI6IkF1dGhvcml6YXRpb24vUmVzb3VyY2UvQmFua2FTZXJ2ZXIiLCJzdWIiOiIifQ.DajG62_EPwLe2xmfQ7oBkgoHP3vCSInyqeL6rpYV97XuXvCzzHKWMwKvAJIGMUfdCdw2XjJw8o-McGSia3TK1w';
  describe('tests for successful credit operation', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      res = await chai.request(server).post('/api/v1/transactions/10650895136/credit').set('Authorization', token).send({ amount: 200 });
    });
    it('Status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Response must be defined', () => {
      expect(res.body).not.to.be.undefined;
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
  });
});
