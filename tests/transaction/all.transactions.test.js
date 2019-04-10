/* eslint-disable no-unused-expressions */
/* eslint no-undef: "error" */

const request = require('request');
const { expect } = require('chai');

describe('Tests for getting all transactions: PATCH /account/<account-number>', () => {
  describe('successful return of accounts', () => {
    const data = {};
    before((done) => {
      request.get('http://localhost:3000/api/v1/transactions', (error, response, body) => {
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
      expect(data.body).not.to.be.undefined;
    });
    it('Must return all accounts', () => {
      expect(data.message).not.to.be.undefined;
    });
  });
  describe('unsuccessful return of accounts', () => {
    const data = {};
    before((done) => {
      request.get('http://localhost:3000/api/v1/transactions', (error, response, body) => {
        const responseBody = JSON.parse(body);
        data.status = responseBody.status;
        data.message = responseBody.message;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).to.equal(400);
    });
    it('Error message must be defined', () => {
      expect(data.message).not.to.be.undefined;
    });
  });
});
