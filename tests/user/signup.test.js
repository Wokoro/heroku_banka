/* eslint-disable no-unused-expressions */
const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');


const server = require('../../server');
const UserModel = require('../../src/models/user.model');

chai.use(chaiHttp);

describe('Create user account tests: POST /auth/signup', () => {
  after(() => { server.close(); });
  describe('tests for successful signup', () => {
    let res = {};
    before(async () => {
      const params = {
        lastName: 'samuel',
        firstName: 'douye',
        email: 'wokorosamuel@yahoo.com',
        isAdmin: false,
        password: 'password',
        confirmPassword: 'password',
        type: 'client',
        phoneNumber: '09044038475',
      };
      res = await chai.request(server).post('/api/v1/auth/signup').send(params);
    });
    it('Response status must be 200', () => {
      expect(res.body).to.have.status(200);
    });
    it('Response must contain token', () => {
      expect(res.body.data).to.have.property('token');
    });
    it('Response must contain id', () => {
      expect(res.body.data).to.have.property('id');
    });
    it('Response must contain firstName', () => {
      expect(res.body.data).to.have.property('firstName');
    });
    it('Response must contain lastName', () => {
      expect(res.body.data).to.have.property('lastName');
    });
    it('Response must contain email', () => {
      expect(res.body.data).to.have.property('email');
    });
    it('User account should be stored', () => {
      expect(UserModel.findByEmail(res.body.data.email)).to.not.be.undefined;
    });
  });
  describe('tests for unsuccessful signup', () => {
    let res = {};
    before(async () => {
      const params = {
        lastName: '',
        firstName: '',
        email: '',
        isAdmin: false,
        password: 'password',
        confirmPassword: 'password',
        type: 'client',
        phoneNumber: '09044038475',
      };
      res = await chai.request(server).post('/api/v1/auth/signup').send(params);
    });
    it('Status 401', () => {
      expect(res.body).to.have.status(401);
    });
    it('Error message must be defined', () => {
      expect(res.body).to.have.property('message');
    });
  });
});
