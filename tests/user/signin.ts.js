/* eslint-disable no-unused-expressions */

const request = require('request');
const { expect } = require('chai');

describe('User signin tests: POST /auth/signin', () => {
  describe('tests for successful signin', () => {
    const params = 'username=wokorosamuel&password=1234';
    const data = {};
    before((done) => {
      request.post(`http://localhost:3000/api/v1/auth/signin?${params}`, (error, response, body) => {
        const responseBody = JSON.parse(body);
        data.status = responseBody.status;
        data.body = responseBody.data;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).to.equal(200);
    });
    it('Response must be defined', () => {
      expect(data.body).to.not.be.undefined;
    });
    it('Response must contain token', () => {
      expect(data.body).to.have.property('token');
    });
    it('Response must contain id', () => {
      expect(data.body).to.have.property('id');
    });
    it('Response must contain firstName', () => {
      expect(data.body).to.have.property('firstName');
    });
    it('Response must contain lastName', () => {
      expect(data.body).to.have.property('lastName');
    });
    it('Response must contain email', () => {
      expect(data.body).to.have.property('email');
    });
  });
  describe('unsuccessful signin', () => {
    const data = {};
    const userName = 'samuel';
    const userPassword = 'samuel';
    const params = `userName=${userName}&password=${userPassword}`;
    before((done) => {
      request.post(`http://localhost:3000/api/v1/auth/signin?${params}`, (error, response, body) => {
        const responseBody = JSON.parse(body);
        data.status = responseBody.status;
        data.error = responseBody.error;
        done();
      });
    });
    it('Error message must be defined', () => {
      expect(false).to.be.true;
    });
    it('Status 401', () => {
      expect(false).to.be.true;
    });
    it('Return error message for an incorrect username', () => {
      expect(false).to.be.true;
    });
    it('Return error message for incorrect passwords', () => {
      expect(false).to.be.true;
    });
  });
});
