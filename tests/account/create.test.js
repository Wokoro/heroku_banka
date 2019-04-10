/* eslint-disable no-unused-expressions */
const request = require('request');
const { expect } = require('chai');

describe('Bank account creation tests: POST /accounts', () => {
  const data = {};
  const params = 'accountNumber=123456&firstName=douye&lastName=wokoro&type=savings&openingBalance=123456&email=wokorosamuel@yahoo.com';
  before((done) => {
    request.post(`http://localhost:3000/api/v1/accounts?${params}`, (error, response, body) => {
      const responseBody = JSON.parse(body);
      data.status = responseBody.status;
      data.body = responseBody.data;
      done();
    });
  });
  it('Status 200', () => {
    expect(data.status).to.equal(200);
  });
  it('Response undefined', () => {
    expect(data.body).not.to.be.undefined;
  });
  it('Response must contain valid account number', () => {
    expect(data.body.accountNumber).not.to.be.undefined;
    expect(data.body.firstName).to.match(/^([A-Za-z])/);
  });
  it('Response must contain valid firstName', () => {
    expect(data.body.firstName).not.to.be.undefined;
    expect(data.body.firstName).to.match(/^([A-Za-z])/);
  });
  it('Response must contain a valid lastName', () => {
    expect(data.body.lastName).not.to.be.undefined;
    expect(data.body.firstName).to.match(/^([A-Za-z])/);
  });
  it('Response must contain a valid email', () => {
    expect(data.body.email).not.to.be.undefined;
    expect(data.body.email).to.match(/^([A-Za-z0-9_\-.])+@([A-Za-z])+\.([A-Za-z])/);
  });
  it('Response must contain account type', () => {
    expect(data.body.type).not.to.be.undefined;
  });
  it('Response must contain opening balance', () => {
    expect(data.body.openingBalance).not.to.be.undefined;
  });
  it('Bank account must be created', () => {
    expect(false).to.be.true;
  });
});
