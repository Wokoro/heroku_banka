/* eslint-disable no-unused-expressions */

const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');

const server = require('../../server');

chai.use(chaiHttp);

describe('User signin tests: POST /auth/signin', () => {
  after(() => { server.close(); });
  describe('tests for successful signin', () => {
    let res = {};
    before(async () => {
      const params = {
        email: 'wokorosamuel@yahoo.com',
        password: 'password',
      };
      res = await chai.request(server).post('/api/v1/auth/signin').send(params);
    });
    it('Response must have status 200', () => {
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
  });
  describe('tests for unsuccessful signin', () => {
    after(() => { server.close(); });
    let res = {};
    before(async () => {
      const params = {
        email: 'wokorosamuel@yahoo.com',
        password: 'wrongpassword',
      };
      res = await chai.request(server).post('/api/v1/auth/signin').send(params);
    });
    it('Response must be 401', () => {
      expect(res.body).to.have.status(401);
    });
    it('Error message must be defined', () => {
      expect(res.body).to.have.property('message');
    });
  });
});
