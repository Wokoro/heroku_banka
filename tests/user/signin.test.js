/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';

const { expect } = chai;

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
      expect(res.body.data).to.have.property('firstname');
    });
    it('Response must contain lastName', () => {
      expect(res.body.data).to.have.property('lastname');
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
    it('Response must be 400', () => {
      expect(res.body).to.have.status(400);
    });
    it('Error message must be defined', () => {
      expect(res.body).to.have.property('message');
    });
  });
});
