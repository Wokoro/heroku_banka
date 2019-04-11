/* eslint-disable no-unused-expressions */


const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('Account activation tests: PATCH /account/<account-number>', () => {
  const adminToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ3b2tvcm9zYW11ZWxAeWFob28uY29tIiwiaXNBZG1pbiI6InRydWUiLCJmaXJzdE5hbWUiOiJzYW11ZWwiLCJsYXN0TmFtZSI6ImRvdXllIiwiaWF0IjoxNTU0OTkxNTU0LCJleHAiOjE1NTUwMzQ3NTQsImlzcyI6IkF1dGhvcml6YXRpb24vUmVzb3VyY2UvQmFua2FTZXJ2ZXIiLCJzdWIiOiIifQ.QQlCb6uzJX3qYEc9tc87XaSq3aJkFvjIG_0-6rAbIuqu_cGgzH4JPyKdJAxrewumt80TjwM2I0a7YjXbFLFDJQ';
  after(() => { server.close(); });
  let res = {};
  before(async () => {
    res = await chai.request(server).patch('/api/v1/account/10650895136').set('Authorization', adminToken).send();
  });
  it('Status 200', () => {
    expect(res.body).to.have.status(200);
  });
  it('Response must be defined', () => {
    expect(res.body).not.to.be.undefined;
  });
  it('Response must contain account number', () => {
    expect(res.body.data).to.have.property('accountNumber');
  });
  it('Response must contain account status', () => {
    expect(res.body).to.have.property('status');
  });
});
