/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

const { expect } = chai;
chai.use(chaiHttp);

describe('Account activation tests: PATCH /account/<account-number>', () => {
  after(() => { server.close(); });
  let res = {};
  before(async () => {
    const loginDetails = {
      email: 'wokorosamuel@yahoo.com',
      password: 'password',
    };
    const params = {
      status: 'active',
      openingBalance: 23774664,
      type: 'savings',
    };
    try {
      const loggedInUser = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
      let { token } = loggedInUser.body.data;
      token = `Bearer ${token}`;
      const newAccount = await chai.request(server).post('/api/v1/accounts').set('Authorization', token).send(params);
      const { accountnumber } = newAccount.body.data;
      res = await chai.request(server).patch(`/api/v1/account/${accountnumber}`).set('Authorization', token).send();
    } catch (err) {
      res.json({ status: 500, message: `An error occured. ${err}` });
    }
  });
  it('Status 200', () => {
    expect(res.body).to.have.status(200);
  });
  it('Response must contain account number', () => {
    expect(res.body.data).to.have.property('accountNumber');
  });
  it('Response must contain account status', () => {
    expect(res.body.data).to.have.property('status');
  });
});
