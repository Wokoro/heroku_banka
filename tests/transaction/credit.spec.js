/* global  beforeAll expect */
/* eslint no-undef: "error" */

const request = require('request');

describe('Credit transaction tests POST /transaction/<account-number>/credit', () => {
  describe('successful credit', () => {
    const data = {};
    const params = '123445678';
    beforeAll((done) => {
      request.post(`http://localhost:3000/api/v1/transaction/${params}/credit`, (error, response, body) => {
        const responseBody = JSON.parse(body);
        data.status = responseBody.status;
        data.body = responseBody.data;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toEqual(200);
    });
    it('Data undefined', () => {
      expect(data.body).not.toBeUndefined();
    });
    it('Data must contain transaction ID', () => {
      expect(data.body.transactionId).toBeTruthy();
    });
    it('Data must contain account number', () => {
      expect(data.body.accountNumber).toBeTruthy();
    });
    it('Data must contain amount', () => {
      expect(data.body.amount).toBeTruthy();
    });
    it('Data must contain cashier name', () => {
      expect(data.body.cashier).toBeTruthy();
    });
    it('Data must contain transaction type', () => {
      expect(data.body.transactionType).toBeTruthy();
    });
    it('Data must contain account balance', () => {
      expect(data.body.accountBalance).toBeTruthy();
    });
  });
});
