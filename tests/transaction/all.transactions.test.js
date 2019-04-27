/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Tests for getting all transactions: PATCH /account/<account-number>', () => {
  describe('successful return of accounts', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      let token;
      const loginDetails = {
        email: 'wokorosamuel@yahoo.com',
        password: 'password',
      };
      try {
        const loggedInUser = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);

        ({ token } = loggedInUser.body.data);
        token = `Bearer ${token}`;
        res = await chai.request(server).get('/api/v1/transactions').set('Authorization', token).send();
      } catch (error) {
        console.log(error);
      }
    });
    it('Status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Must return all accounts', () => {
      expect(res.body).to.have.property('transactions');
    });
  });
});
