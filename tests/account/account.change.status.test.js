/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const { expect } = chai;
chai.use(chaiHttp);

describe('Account activation tests: PATCH /account/<account-number>', () => {
  const adminToken = process.env.TEST_TOKEN;
  after(() => { server.close(); });
  let res = {};
  before(async () => {
    res = await chai.request(server).patch('/api/v1/account/5748394867').set('Authorization', adminToken).send();
  });
  it('Status 200', () => {
    expect(res.body).to.have.status(200);
  });
  it('Response must contain account number', () => {
    expect(res.body.data).to.have.property('accountNumber');
  });
  it('Response must contain account status', () => {
    expect(res.body).to.have.property('status');
  });
});
