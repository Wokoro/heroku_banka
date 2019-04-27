/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Debit transaction tests POST /transaction/<account-number>/debit', () => {
  let token;
  let accountnumber;
  before(async () => {
    const signupParams = {
      lastName: 'samuel',
      firstName: 'douye',
      email: 'douye@yahoo.com',
      isAdmin: true,
      password: 'password',
      confirmPassword: 'password',
      type: 'staff',
      phoneNumber: 90440,
    };
    const loginDetails = { email: 'douye@yahoo.com', password: 'password' };
    const params = { status: 'active', openingBalance: 23774664, type: 'savings' };
    try {
      await chai.request(server).post('/api/v1/auth/signup').send(signupParams);
      const loggedInUser = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);

      ({ token } = loggedInUser.body.data);
      token = `Bearer ${token}`;

      const result = await chai.request(server).post('/api/v1/accounts').set('Authorization', token).send(params);

      ({ accountnumber } = result.body.data);
    } catch (error) {
      console.log(error);
    }
  });
  describe('tests for successful debit operation', () => {
    let res = {};
    after(() => { server.close(); });
    before(async () => {
      res = await chai.request(server).post(`/api/v1/transactions/${accountnumber}/debit`).set('Authorization', token).send({ amount: 200 });
    });
    it('Status 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Response must contain transaction ID', () => {
      expect(res.body.data).to.have.property('id');
    });
    it('Response must contain account number', () => {
      expect(res.body.data).to.have.property('accountnumber');
    });
    it('Response must contain new balance', () => {
      expect(res.body.data).to.have.property('newbalance');
    });
    it('Response must contain old balance', () => {
      expect(res.body.data).to.have.property('oldbalance');
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
    it('Account balance should decrease', () => {
      expect(res.body.data.newbalance < res.body.data.oldbalance).to.be.true;
    });
  });
});
