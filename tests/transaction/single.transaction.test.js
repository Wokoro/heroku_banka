/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Single transaction tests Get /transactions/<transaction-number>/', () => {
  let token;
  let id;
  describe('tests for successful return of single transaction', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      const signupParams = {
        lastName: 'samuel',
        firstName: 'douye',
        email: 'clientuser@yahoo.com',
        isAdmin: false,
        password: 'password',
        confirmPassword: 'password',
        type: 'staff',
        phoneNumber: 90440,
      };
      await chai.request(server).post('/api/v1/auth/signup').send(signupParams);
      const params = { email: 'clientuser@yahoo.com', password: 'password' };
      const accountCreate = {
        status: 'active',
        openingBalance: 23774664,
        type: 'savings',
      };
      const result = await chai.request(server).post('/api/v1/auth/signin').send(params);
      ({ token } = result.body.data);
      token = `Bearer ${token}`;

      const account = await chai.request(server).post('/api/v1/accounts').set('Authorization', token).send(accountCreate);

      const { accountnumber } = account.body.data;

      const transaction = await chai.request(server).post(`/api/v1/transactions/${accountnumber}/credit`).set('Authorization', token).send({ amount: 200 });

      ({ id } = transaction.body.data);
      res = await chai.request(server).get(`/api/v1/transactions/${id}`).set('Authorization', token).send();
    });
    it('Status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Response must contain transaction', () => {
      expect(res.body).to.have.property('transaction');
    });
  });
});
