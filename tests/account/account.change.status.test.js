/* eslint-disable no-unused-expressions */


const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('Account activation tests: PATCH /account/<account-number>', () => {
  const adminToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ3b2tvcm9zYW11ZWxAeWFob28uY29tIiwiaXNBZG1pbiI6InRydWUiLCJmaXJzdE5hbWUiOiJzYW11ZWwiLCJsYXN0TmFtZSI6ImRvdXllIiwiaWF0IjoxNTU1MDQ4MzkzLCJleHAiOjE1NTUyMjExOTMsImlzcyI6IkF1dGhvcml6YXRpb24vUmVzb3VyY2UvQmFua2FTZXJ2ZXIiLCJzdWIiOiIifQ.S-d7og-kaTFHR3GSlwUzQqs-vJRjCaE_g6PRVE9GGiTeG1-Umqs-8q5dZzH3hq2A1ns0L5-3Iw4r4p6QSLH-iQ';
  after(() => { server.close(); });
  let res = {};
  before(async () => {
    res = await chai.request(server).patch('/api/v1/account/5748394867').set('Authorization', adminToken).send();
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
