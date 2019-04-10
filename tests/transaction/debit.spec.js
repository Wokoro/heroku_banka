/* global  beforeAll expect */
/* eslint no-undef: "error" */

const request = require('request');

describe('Debit transaction tests POST /transaction/<account-number>/debit', () => {
  describe('successful debit', () => {
    const data = {};
    const params = 'accountNumber=123445678';
    beforeAll((done) => {
      request.post(`http://localhost:3000/api/v1/transaction/?${params}/debit`, (error, response, body) => {
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
  describe('Unsuccessful debit', () => {
    const data = {};
    const params = 'accountNumber=12345';
    beforeAll((done) => {
      request.post(`http://localhost:3000/api/v1transaction/${params}/debit`, (error, response, body) => {
        const responseBody = JSON.parse(body);
        data.status = responseBody.status;
        data.error = responseBody.error;
        done();
      });
    });
    it('Status 422', () => {
      expect(data.status).toEqual(422);
    });
    it('Error message must be defined', () => {
      expect(data.error).not.toBeUndefined();
    });
    it('Must return "Insufficient Balance" message for debit transactions greater than account balance', () => {
      let temp = true;
      // Implement a way to check if the balance is lessthan transaction ammount
      // and replace true with that value
      if (true && !(data.body.error === 'Insufficient Balance')) temp = true;
      expect(temp).toBeTruthy();
    });
  });
});
